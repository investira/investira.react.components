import React, { useEffect, useState, forwardRef } from "react";
import { currency } from "investira.react.lib";
import { validators } from "investira.sdk";
import PropTypes from "prop-types";

const InputDecimal = forwardRef((props, ref) => {
  const [value, setValue] = useState(props.value);

  function formatTextValue(pValue = 0, pDecimal = 2, pCurrency = "BRL") {
    let xValue = validators.isNumber(pValue)
      ? pValue.toFixed(pDecimal)
      : pValue;

    xValue = currency.toDecimal(
      xValue.toString(),
      ".",
      pCurrency,
      "pt-BR",
      pDecimal
    );

    return xValue;
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

  useEffect(() => {
    if (formatTextValue(props.value, props.decimal) !== value) {
      setValue(formatTextValue(props.value, props.decimal));
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
      value={value || props.value}
      onChange={handleChange}
    />
  );
});

InputDecimal.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  currency: PropTypes.string,
  separator: PropTypes.oneOf([".", ","]),
};

InputDecimal.defaultProps = {
  separator: ",",
  currency: "BRL",
};

InputDecimal.displayName = "InputDecimal";

export default InputDecimal;
