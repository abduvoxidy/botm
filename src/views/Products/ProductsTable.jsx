import classes from "./style.module.scss";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ButtonsPopover from "../../components/ButtonsPopover";
import {
  CTable,
  CTableBody,
  CTableCell,
  CTableHead,
  CTableHeadRow,
  CTableRow,
} from "../../components/CTable";
import productService from "../../services/productsService";
import { pageToOffset } from "../../utils/pageToOffset";
import productImageUrl from "../../assets/download.jpg";
import DeleteModal from "../../components/common/DeleteModal/DeleteModal";

const PositionsTable = () => {
  const navigate = useNavigate();

  const [tableData, setTableData] = useState(null);
  const [loader, setLoader] = useState(true);
  const [pageCount, setPageCount] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [openModal, setOpenModal] = useState({status: false, id: null})

  const closeErrorModal =() => {
    setOpenModal((prev) => ({...prev, status: false}))
}

  const columns = [
    {
      key: "image",
      title: "Image",
      render: (itemObj) => (
        <img
          src={itemObj.photo_url}
          className={classes.image}
          alt="Product-image"
        />
      ),
    },
    { key: "name", title: "Name" },
    { key: "price", title: "Price" },
    // { key: "description", title: "Description" },
    { key: "status", title: "Status" },
    {
      key: "actions",
      title: "Actions",
      render: (itemObj) => (
        <ButtonsPopover
          id={itemObj.id}
          onEditClick={navigateToEditForm}
          setOpenModal={setOpenModal}
        />
      ),
    },
  ];


  useEffect(() => {
    fetchTableData();
  }, []);

  // Fetch all data
  const fetchTableData = () => {
    setLoader(true);
    productService
      .getList({
        limit: 10,
        offset: pageToOffset(currentPage),
      })
      .then((res) => {
        setTableData(res.products);
        setPageCount(Math.ceil(res?.count / 10));
      })
      .finally(() => setLoader(false));
  };

  // Delete data quiery
  const deleteTableData = (id) => {
    setLoader(true);
    productService
      .delete(id)
      .then((res) => {
        fetchTableData();
      })
      .catch(() => setLoader(false));
  };

  // Navigate to the Edit page
  const navigateToEditForm = (e, id) => {
    navigate(`/products/${id}`);
  };

  console.log(tableData);

  return (
    <>
    <CTable
      count={pageCount}
      page={currentPage}
      setCurrentPage={setCurrentPage}
      columnsCount={4}
      loader={loader}
    >
      <CTableHead>
        <CTableHeadRow>
          {columns.map((column) => {
            return <CTableCell key={column.key}>{column.title}</CTableCell>;
          })}
        </CTableHeadRow>
      </CTableHead>
      {
        <CTableBody
          loader={loader}
          columnsCount={3}
          dataLength={tableData?.length}
        >
          {tableData?.map((data, index) => (
            <>
              <CTableRow
                key={data.id}
                // onClick={() => navigate(`/projects/${data.id}/backlog`)}
              >
                {columns.map((column) => {
                  return (
                    <CTableCell
                      className={
                        column.key === "image" || column.key === "actions"
                          ? classes.imageBox
                          : ""
                      }
                      key={column.id}
                    >
                      {column.render ? column.render(data) : data[column.key]}
                    </CTableCell>
                  );
                })}
              </CTableRow>
            </>
          ))}
        </CTableBody>
      }
    </CTable>

    {openModal.status && <DeleteModal openModal={openModal} closeErrorModal={closeErrorModal} deleteTableData={deleteTableData}/> }
    </>
  );
};

export default PositionsTable;
