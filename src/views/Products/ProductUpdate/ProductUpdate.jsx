import styles from "./style.module.scss";
import React from "react";
import FormCard from "../../../components/FormCard";
import FRow from "../../../components/FormElements/FRow";
import HFTextField from "../../../components/FormElements/HFTextField";
import HFSelect from "../../../components/FormElements/HFSelect";
import HFDateTimePicker from "../../../components/FormElements/HFDateTimePicker";
import HFSwitch from "../../../components/FormElements/HFSwitch";
import SaveButton from "../../../components/Buttons/SaveButton";
import CancelButton from "../../../components/Buttons/CancelButton";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import HFInputField from "../../../components/FormElements/HFInputField";
import HFTextArea from "../../../components/FormElements/HFTextArea";
import Switcher from "../../../components/FormElements/Switch";
import { useState } from "react";

//Default Image
import defImage from "../../../assets/download.jpg";
import { useEffect } from "react";
import axios from "axios";

const foodOptions = [
  { label: "Fruits", value: "fruits" },
  { label: "Vegetables", value: "vegetables" },
  { label: "Dairy Products", value: "dairy" },
  { label: "Grains", value: "grains" },
  { label: "Proteins", value: "proteins" },
  { label: "Sweets", value: "sweets" },
];

const currencyCategories = [
  { label: "USD", value: "USD" },
  { label: "UZS", value: "UZS" },
  { label: "EUR", value: "EUR" },
];

export default function ProductUpdate({ loader, btnLoader, control }) {
  const [productObj, setProductObj] = useState();

  const navigate = useNavigate();
  const { id } = useParams();

  console.log(id);

  useEffect(() => {
    getSingleData(16);
  }, []);

  const getSingleData = (id) => {
    axios
      .get(`https://dummyjson.com/products/${id}`)
      .then((res) => setProductObj(res.data))
      .catch((err) => console.log(err));
  };

  // console.log(productObj)
  return (
    <div className={styles.updateComponent}>
      <div className={styles.leftSide}>
        <FormCard visible={!loader} title="Update Product">
          <div className={styles.flex}>
            <FRow required label="Product Name">
              <HFTextField
                fullWidth
                control={control}
                name="name"
                required
                rules={{}}
              />
            </FRow>
            <FRow required label="Price">
              <HFTextField
                type="number"
                fullWidth
                control={control}
                name="price"
                required
                rules={{}}
              />
            </FRow>
          </div>
          <div className={styles.flex}>
            <FRow required label="Select Category">
              <HFTextField
                control={control}
                name="category_id"
                fullWidth
                required
                rules={{}}
              />

              {/* <HFSelect
                fullWidth
                control={control}
                name="category_id"
                label="Select Category"
                options={foodOptions}
                required
                rules={{}}
              /> */}
            </FRow>
            {/* <FRow required label="Select Currency">
              <HFSelect
                fullWidth
                control={control}
                name="selectCurrency"
                label="Select Currency"
                options={currencyCategories}
                required
                rules={{}}
              />
            </FRow> */}
          </div>
          <div className={styles.flex}>
            {/* <FRow required label="Quantity"> */}
            {/* <HFTextField fullWidth control={control} name="quantity" /> */}
            {/* <HFInputField
                fullWidth
                type="number"
                control={control}
                name="quantity"
                label="Quantity"
                required
                rules={{}}
              />
            </FRow> */}
            <FRow required label="Company Id">
              <HFTextField
                fullWidth
                control={control}
                name="company_id"
                required
                rules={{}}
              />
            </FRow>
          </div>

          <FRow label="Description">
            <HFTextArea
              control={control}
              className={styles.description}
              label="Message"
              name="description"
              // required
              // rules={{}}
            />
          </FRow>

          <FRow label="Image Upload">
            {/* <HFImageUpload fullWidth control={control}  label="Image Upload" name="imageUpload" /> */}
            <HFTextField
              fullWidth
              control={control}
              name="photo_url"
              required
              rules={{}}
            />
          </FRow>

          <div className={styles.flex}>
            <FRow label="Status Available">
              {/* <HFSwitch control={control} name="status" /> */}
              <Switcher
                name="status"
                control={control}
                defaultValue={false}
                label="Toggle Switch"
                color="primary"
              />
            </FRow>
            {/* <FRow label="Discount Available">
              <HFSwitch control={control} name="discount_available" />
            </FRow> */}
          </div>

          <div className={styles.saveAndCancelContainer}>
            <SaveButton type="submit" loading={btnLoader} />
            <CancelButton onClick={() => navigate(-1)} />
          </div>
        </FormCard>
      </div>
      {/* <div className={styles.rightSide}>
        <FormCard visible={!loader} title="Updated Product">
        <div className={styles.content}>
        <div className={styles.updatedImage}>
                  <img src={productObj?.images[0]}/>
            </div> 
            <div className={styles.productTitle}>
                <div className={styles.left}>
                <h2>Title:</h2>
                  <p>{productObj?.title}<span>(x{productObj?.stock})</span></p>
                </div>
                <div className={styles.right}>
                <h2>Price:</h2>
                  <p>{productObj?.price}</p>
                </div>
            </div>
            <div className={styles.category}>
            <div className={styles.left}>
                <h2>Category:</h2>
                  <p>{productObj?.category}</p>
                </div>
                <div className={styles.right}>
                <h2>Discount:</h2>
                  <p>{productObj?.discountPercentage}</p>
                </div> 
            </div>
            <div className={styles.description}>
              <h2>Description:</h2>
              <p>{productObj?.description}</p>
            </div>
        </div>
           
            
        </FormCard>
      </div> */}
    </div>
  );
}
