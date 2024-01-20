import styles from "./style.module.scss";
import React from "react";
import FormCard from "../../../components/FormCard";
import FRow from "../../../components/FormElements/FRow";
import HFSelect from "../../../components/FormElements/HFSelect";
import HFTextField from "../../../components/FormElements/HFTextField";
import HFSwitch from "../../../components/FormElements/HFSwitch";
import HFTextArea from "../../../components/FormElements/HFTextArea";
import HFImageUpload from "../../../components/FormElements/HFImageUpload";
import { useNavigate } from "react-router-dom";

const categoryId = [
  { label: "CategoryId-1", value: "c8ee405b-f266-4585-b7be-ac10cffef2d6" },
  { label: "CategoryId-default", value: "default category id" },
  { label: "CategoryId-default", value: "default category id" },
  { label: "CategoryId-default", value: "default category id" },
];

export default function ProductCreate({ loader, control }) {
  const navigate = useNavigate();

  return (
    <div className={styles.flex}>
      <div className={styles.createLeftSide}>
        <FormCard visible={!loader} title="Main info">
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
              <HFSelect
                fullWidth
                control={control}
                name="category_id"
                label="Select Category"
                options={categoryId}
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
            />
          </FRow>

          <FRow label="Image Upload">
            <HFImageUpload
              fullWidth
              control={control}
              label="Image Upload"
              name="photo_url"
            />
          </FRow>
        </FormCard>
      </div>

      <div className={styles.createRightSide}>
        <FormCard title="" visible={!loader}>
          <div className={styles.flex}>
            <FRow label="Status Available">

              <HFSwitch
                name="status"
                control={control}
                label="Switch Status"
                defaultValue={false}
                color="primary" 
               />

            </FRow>
          </div>
        </FormCard>
      </div>
    </div>
  );
}
