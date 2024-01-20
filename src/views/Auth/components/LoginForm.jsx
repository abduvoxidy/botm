import { TextField } from "@mui/material";
import { useDispatch } from "react-redux";
import PrimaryButton from "../../../components/Buttons/PrimaryButton";
import SecondaryButton from "../../../components/Buttons/SecondaryButton";
import { authActions } from "../../../store/auth/auth.slice";
import classes from "../style.module.scss";
import axios from "axios";
import { baseURL } from "../../../utils/request";
import { useState } from "react";
import { useForm } from "react-hook-form";
import HFTextField from "../../../components/FormElements/HFTextField";

// const baseURL2 = "https://dummyjson.com/auth/login" 

const LoginForm = ({ navigateToRegistrationForm }) => {
  const [inputValues, setInputValues] = useState({username: "", password: ""})

  const dispatch = useDispatch();

  // const {register, handleSubmit, control, formState: {errors}} = useForm({defaultValues: {username: "", password: ""}})

  const handleLogin = ({username, password}) => {
    console.log(username, password)
    axios
      .post(`${baseURL}/login`, {
        username,
        password
      })
      .then((res) => {
        console.log(res)
        dispatch(authActions.login());
        dispatch(authActions.saveToken(res.data?.data?.token?.access_token));
        console.log("res", res);
      })
      .catch((err)=> console.log("Error", err));
    };


  return (
    <form
      onSubmit={(e) => {
        e.stopPropagation();
        e.preventDefault();
        handleLogin(inputValues)
        // handleSubmit(handleLogin)
      }}
      className={classes.form}
    >
      <div className={classes.formArea}>
        <div className={classes.formRow}>
          <p className={classes.label}>Логин</p>
         
          <TextField fullWidth name="username" onChange={(e)=> setInputValues((prev)=> ({
            ...prev,
            username: e.target.value
          }))}   
         placeholder="Введите логин" />                              
        </div>
        <div className={classes.formRow}>
          <p className={classes.label}>Пароль</p>
          
          <TextField fullWidth name="password" onChange={(e)=> setInputValues(prev=> ({
            ...prev, 
            password: e.target.value
          }))}   placeholder="Введите пароль" />
        </div>
      </div>

      <div className={classes.buttonsArea}>
        <PrimaryButton type="submit">Войти</PrimaryButton>
        {/* <SecondaryButton type="button" onClick={navigateToRegistrationForm}>
          Зарегистрироваться
        </SecondaryButton> */}
      </div>
    </form>
  );
};

export default LoginForm;
