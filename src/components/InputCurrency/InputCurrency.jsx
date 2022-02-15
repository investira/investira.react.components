import React, { useEffect, useState, forwardRef } from "react";
import { currency } from "investira.react.lib";
import { validators } from "investira.sdk";
import PropTypes from "prop-types";

const InputCurrency = forwardRef((props, ref) => {
  const [value, setValue] = useState(props.value);

  function formatTextValue(pValue = "", pDecimal = 2, pCurrency = "BRL") {
    const xValue = validators.isNumber(pValue)
      ? pValue.toFixed(pDecimal)
      : pValue;

    return currency.toCurrency(
      xValue.toString(),
      ".",
      pCurrency,
      "pt-BR",
      pDecimal
    );
  }

  function handleChange(pEvent) {
    pEvent.persist();
    const xValueAsCurrency = formatTextValue(
      pEvent.target.value,
      props.decimal,
      props.currency
    );

    setValue(xValueAsCurrency);

    if (props.onChange) {
      props.onChange(
        pEvent,
        currency.currencyToNumber(xValueAsCurrency, ".", props.decimal)
      );
    }
  }

  function getValue() {
    return value || props.value;
  }

  useEffect(() => {
    if (formatTextValue(props.value) !== value) {
      setValue(formatTextValue(props.value));
    }
  }, [props.value, value]);

  const { ...inputProps } = props;

  return (
    <input
      ref={ref}
      {...inputProps}
      type="text"
      pattern="\d*"
      data-numeric-input
      value={getValue()}
      onChange={handleChange}
    />
  );
});

InputCurrency.propTypes = {
  onChange: PropTypes.func,
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  currency: PropTypes.string,
  separator: PropTypes.oneOf([".", ","]),
};

InputCurrency.defaultProps = {
  defaultValue: "0.00",
  separator: ",",
  currency: "BRL",
};

export default InputCurrency;
