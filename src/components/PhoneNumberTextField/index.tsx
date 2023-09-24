import "react-phone-input-material-ui/lib/style.css";

import { useCallback, useState } from "react";
import ReactPhoneInput, { CountryData } from "react-phone-input-material-ui";

import { FormGroup, FormHelperText, TextField } from "@mui/material";
import { ActionOptionObjectItem } from "@accesso/loqueue-qsmart-nextgen-shared-components";

export interface PhoneNumberResult {
  number: string;
  country_code: string;
}

interface PhoneNumberTextFieldProps {
  value?: string;
  onChange?: (data: PhoneNumberResult | string) => void;
  isValidNumber: (number: string) => boolean;
  regions?: string[];
  defaultCountry?: string;
  country?: string;
  preferredCountries?: string[];
  error?: boolean; // Unused
  helperText?: string;
  acceptedCountryCodes: ActionOptionObjectItem[];
}

/**
 * Even though this basically just wraps the ReactPhoneInput  for
 * now, I've abstracted away from that library specifically (where
 * possible) so that if we need to change libraries OR just write
 * our own simple phone number handling Input then it'll be easier
 * to do later.
 */
export function PhoneNumberTextField(props: PhoneNumberTextFieldProps) {
  const [value, setValue] = useState<string>(props.value ?? "");

  const onChange = useCallback((value: string, _data: CountryData) => {
    setValue(value);
    let formattedDialCode = props.acceptedCountryCodes.find(x => x.text === _data.name)?.data;
    props?.onChange?.(formattedDialCode
      ? { number: value.replace(_data.countryCode, ''), country_code: formattedDialCode } as PhoneNumberResult
      : value
    );
  },
    [props]
  );

  return (
    <FormGroup>
      <ReactPhoneInput
        {...props}
        value={value}
        onChange={onChange}
        component={TextField}
        isValid={props.isValidNumber}
      />
      {!!props.helperText && (
        <FormHelperText>{props.helperText}</FormHelperText>
      )}
    </FormGroup>
  );
}
