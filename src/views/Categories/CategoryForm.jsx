import React, {useEffect, useState} from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import CancelButton from "../../components/Buttons/CancelButton";
import SaveButton from "../../components/Buttons/SaveButton";
import CBreadcrumbs from "../../components/CBreadcrumbs";
import Header from "../../components/Header";
import CategoryService from "../../services/categoryServices";
import CategoryCreate from "./CategoryCreate/CategoryCreate";

export default function CategoryForm() {
  const { id } = useParams()
  const navigate = useNavigate();
  const { control, handleSubmit, reset, formState: { errors }, } = useForm();
  const [btnLoader, setBtnLoader] = useState(false);
  const [loader, setLoader] = useState(true);

  const breadCrumbItems = [
    {
      label: "Category",
    },
    {
      label: id ? "Update" : "Create",
    },
  ];

  console.log(id)

  useEffect(()=> {
    fetchCategoryData()
  }, [])


  const onSubmit = (value) => {
    console.log(value);

    const data = {
      ...value,
      status: value.status ? "active" : "inactive",
      company_id: "c6440797-dc74-4054-a0f0-2a4d3e6d3867",
    }

    if(id) return updateCategory(data)
    createCategory(data)
  };


  console.log(id)

 // Get Single category for update
 const fetchCategoryData = () => {
  if (!id) return setLoader(false);

  CategoryService.getById(id)
    .then((res) => {
      const {name, description, photo_url, status} = res
      const categoryObj = {
        name,
        description,
        photo_url,
        status: status ==="active" ? true : false
      }
      reset(categoryObj);
    })
    .finally(() => setLoader(false));
};


  // Create new category
  const createCategory = (data) => {
    setBtnLoader(true)
    CategoryService.create(data)
    .then(res => {
      navigate(`/category`)
      console.log(res)})
    .catch(err => console.log(err))
    .finally(()=> setBtnLoader(false))
  }


  //Update category 
  const updateCategory = (data) => {
    setBtnLoader(true)
    CategoryService.update({
      ...data,
      id
    })
    .then(res => {
      navigate(`/category`)
      console.log(res)
    })
    .catch((err)=> console.log(err))
    .finally(()=> setBtnLoader(false))
  }



  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Header
        // loader={loader}
        backButtonLink={"/category"}
        title="Category"
        extra={
          <>
            <CancelButton onClick={() => navigate(-1)} />
            <SaveButton type="submit" loading={btnLoader}/>
          </>
        }
      >
        <CBreadcrumbs withDefautlIcon items={breadCrumbItems} />
      </Header>

         <CategoryCreate control={control} loader={loader}/>
        
    </form>
  );
}
