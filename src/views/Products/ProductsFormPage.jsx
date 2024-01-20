import styles from "./style.module.scss";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import CancelButton from "../../components/Buttons/CancelButton";
import SaveButton from "../../components/Buttons/SaveButton";
import CBreadcrumbs from "../../components/CBreadcrumbs";
import Header from "../../components/Header";
import productsService from "../../services/productsService";
import ProductCreate from "./ProductCreate/ProductCreate";
import ProductUpdate from "./ProductUpdate/ProductUpdate";

const PositionsFormPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [btnLoader, setBtnLoader] = useState(false);
  const [loader, setLoader] = useState(true);
  const [singleDataObj, setSingleDataObj] = useState({
    id: "",
    name: "",
    price: null,
    category_id: "",
    company_id: "",
    description: "",
    photo_url: "",
  });

  const breadCrumbItems = [
    {
      label: "Products",
    },
    {
      label: id ? "Update" : "Create",
    },
  ];

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm();

  console.log("watch", watch());
  useEffect(() => {
    fetchData();
  }, []);

  // Get Single data
  const fetchData = () => {
    if (!id) return setLoader(false);

    productsService
      .getById(id)
      .then((res) => {
        console.log(res);

        reset(res);
      })
      .finally(() => setLoader(false));
  };

  const onSubmit = (values) => {
    const data = {
      ...values,
      price: +values.price,
      status: values.status ? "active" : "Not-active",
      category_id: "c8ee405b-f266-4585-b7be-ac10cffef2d6",
      company_id: "c6440797-dc74-4054-a0f0-2a4d3e6d3867",
    };

    //    "category_id": "c8ee405b-f266-4585-b7be-ac10cffef2d6",
    // "company_id": "c6440797-dc74-4054-a0f0-2a4d3e6d3867",
    // "description": "test description 2",
    // "name": "test name 2",
    // "photo_url": "http://api.botm.uz/api/download/91d5d265-b8b9-4d18-a788-413356e6c1bb",
    // "price": 10000,
    // "status": "active"

    if (id) return update(data);
    createProduct(data);
  };

  // Create new Product
  const createProduct = (data) => {
    setBtnLoader(true);
    productsService
      .create(data)
      .then((res) => {
        navigate(`/products`);
      })
      .catch((err) => console.log(err))
      .finally(() => setBtnLoader(false));
  };

  // Update the product
  const update = (data) => {
    console.log(data);
    setBtnLoader(true);
    productsService
      .update({
        ...data,
        id,
      })
      .then((res) => {
        console.log(res);
        navigate(`/products`);
      })
      .finally(() => setBtnLoader(false));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.handleSubmitForm}>
      <Header
        loader={loader}
        backButtonLink={"/positions"}
        title="Positions"
        extra={
          <>
            <CancelButton onClick={() => navigate(-1)} />
            <SaveButton type="submit" loading={btnLoader} />
          </>
        }
      >
        <CBreadcrumbs withDefautlIcon items={breadCrumbItems} />
      </Header>
      <div className={styles.CreateUpdateContainer}>
        {id ? (
          <ProductUpdate
            loader={loader}
            btnLoader={btnLoader}
            control={control}
          />
        ) : (
          <ProductCreate
            loader={loader}
            btnLoader={btnLoader}
            control={control}
          />
        )}
      </div>
    </form>
  );
};

export default PositionsFormPage;
