import React, { useState, useEffect } from "react";
import classes from "./style.module.scss";

import {
  CTable,
  CTableBody,
  CTableCell,
  CTableHead,
  CTableHeadRow,
  CTableRow,
} from "../../components/CTable";
import CategoryService from "../../services/categoryServices";
import ButtonsPopover from "../../components/ButtonsPopover";
import { pageToOffset } from "../../utils/pageToOffset";
import { useNavigate } from "react-router-dom";
import DeleteModal from "../../components/common/DeleteModal/DeleteModal";

export default function CustomPaginationActionsTable() {
  const [categoryList, setCategoryList] = useState([]);
  const [loader, setLoader] = useState(true);
  const [pageCount, setPageCount] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [openModal, setOpenModal] = useState({ status: false, id: null });
  const navigate = useNavigate();

  const columns = [
    {
      key: "image",
      title: "Photo",
      render: (itemObj) => (
        <img
          src={itemObj.photo_url}
          className={classes.categoryImage}
          alt="Category"
        />
      ),
    },
    { key: "name", title: "Name" },
    { key: "description", title: "Description" },
    { key: "status", title: "Status" },
    {
      key: "actions",
      title: "Actions",
      render: (itemObj) => (
        <ButtonsPopover
          id={itemObj.id}
          onEditClick={navigateToEditForm}
          setOpenModal={setOpenModal}
          // onDeleteClick={deleteTableData}
        />
      ),
    },
  ];

  const closeErrorModal = () => {
    setOpenModal((prev) => ({ ...prev, status: false }));
  };

  useEffect(() => {
    getCategoryList();
  }, []);

  // Get all Categories
  const getCategoryList = () => {
    setLoader(true);
    CategoryService.getList({
      limit: 10,
      offset: pageToOffset(currentPage),
    })
      .then((res) => {
        setCategoryList(res.categories);
        setPageCount(Math.ceil(res?.count / 10));
      })
      .catch((err) => console.log(err))
      .finally(() => setLoader(false));
  };

  // Navigate to edit form
  const navigateToEditForm = (e, id) => {
    navigate(`/category/${id}`);
  };

  // Delete category
  const deleteTableData = (id) => {
    setLoader(true);
    CategoryService.delete(id)
      .then((res) => getCategoryList())
      .catch((err) => console.log(err))
      .finally(() => setLoader(false));
  };

  console.log(categoryList);
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
            {columns.map((col) => (
              <CTableCell key={col.key} align="center">
                {col.title}
              </CTableCell>
            ))}
          </CTableHeadRow>
        </CTableHead>
        <CTableBody
          loader={loader}
          columnsCount={columns.length} // Use the correct number of columns
          dataLength={categoryList?.length || 0} // Handle undefined or null
        >
          {categoryList?.map((row, i) => (
            <CTableRow key={i}>
              {columns?.map((column, j) => (
                <CTableCell
                  className={
                    column.key === "image" || column.key === "actions"
                      ? classes.imageBox
                      : ""
                  }
                  align="center"
                  key={j}
                >
                  {column.render ? column.render(row) : row[column.key]}
                </CTableCell>
              ))}
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>
      {openModal.status && (
        <DeleteModal
          openModal={openModal}
          closeErrorModal={closeErrorModal}
          deleteTableData={deleteTableData}
        />
      )}
    </>
  );
}
