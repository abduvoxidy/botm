import { Switch } from "@mui/material"
import { useId } from "react"
import { Controller } from "react-hook-form"

const HFSwitch = ({ control, name, label, disabledHelperText, labelProps, ...props }) => {
  const id = useId()

  return (
    <Controller
      control={control}
      name={name}
      defaultValue={false}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <div className={!disabledHelperText ? 'mb-1' : ''} >
          <Switch
            id={`switch-${id}`}
            // checked={value ?? false}
            {...props}
            checked={value}
            onChange={(e, val) => {
              // console.log("Target checked",e.target.checked)
              // console.log(value)
              // console.log("field",field)
              console.log("value", val)
              onChange(e.target.checked)
              }}
          />
          <label htmlFor={`switch-${id}`} {...labelProps}>
            {label}
          </label>
        </div>
      )}
    ></Controller>
  )
}

export default HFSwitch
