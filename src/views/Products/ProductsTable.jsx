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

const PositionsTable = () => {
  const navigate = useNavigate();

  const [tableData, setTableData] = useState(null);
  const [loader, setLoader] = useState(true);
  const [pageCount, setPageCount] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

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
  const deleteTableData = (e, id) => {
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
    <CTable
      count={pageCount}
      page={currentPage}
      setCurrentPage={setCurrentPage}
      columnsCount={4}
      loader={loader}
    >
      <CTableHead>
        <CTableHeadRow>
          <CTableCell width={50}>No</CTableCell>
          <CTableCell width={100}>Image</CTableCell>
          <CTableCell>Name</CTableCell>
          <CTableCell>Price</CTableCell>
          <CTableCell>Status</CTableCell>
          <CTableCell>Actions</CTableCell>
        </CTableHeadRow>
      </CTableHead>
      {
        <CTableBody
          loader={loader}
          columnsCount={3}
          dataLength={tableData?.length}
        >
          {" "}
          {/*dataLength={tableData?.length}*/}
          {tableData?.map((data, index) => (
            <>
              {console.log(data)}
              <CTableRow
                key={data.id}
                // onClick={() => navigate(`/projects/${data.id}/backlog`)}
              >
                <CTableCell>{index + 1}</CTableCell>
                <CTableCell>
                  <img src={productImageUrl} />
                </CTableCell>
                <CTableCell>{data.name}</CTableCell>
                <CTableCell>{data.price}</CTableCell>
                <CTableCell>
                  {data.status === "active" ? "True" : "False"}
                </CTableCell>
                <CTableCell>
                  <ButtonsPopover
                    id={data.id}
                    onEditClick={navigateToEditForm}
                    onDeleteClick={deleteTableData}
                  />
                </CTableCell>
              </CTableRow>
            </>
          ))}
        </CTableBody>
      }
    </CTable>
  );
};

export default PositionsTable;
