import React, {
  useState,
  useRef,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import PropTypes from "prop-types";
import {
  InputBase,
  IconButton,
  FormControl,
  Chip,
  Icon,
  Box,
  Stack,
} from "../";
import { styled } from "@mui/material/styles";
import { validators } from "investira.sdk";
import Style from "./SearchBox.module.scss";

let timeout = null;
const FindIcon = styled(Icon)(({}) => ({
  margin: "12px",
}));

const SearchBox = forwardRef((props, ref) => {
  const [clearBtn, setClearBtn] = useState(!validators.isNull(props.value));
  const [value, setValue] = useState(props.value || "");
  const [querySplited, setQuerySplited] = useState(
    props.value ? props.value.split(" ") : []
  );

  const searchRef = useRef();
  const mount = useRef(false);

  const handleClear = (pEvent) => {
    setValue("");
    setClearBtn(false);
    setQuerySplited([]);
    props.clearCallback && props.clearCallback(pEvent);
  };

  const handleChange = (pEvent) => {
    const xValue = pEvent.currentTarget.value;
    updateValue(xValue);
  };

  const querySplit = (xQuery) => {
    //verifica se tem vírgula ou ponto e vírgula
    const xRegex = /,|;/gi;
    const xMatch = validators.isNull(xQuery.match(xRegex));
    const xQuerySplited = xQuery.split(xMatch ? " " : xRegex);
    return xQuerySplited;
  };

  const updateValue = (pValue) => {
    setValue(pValue);
    //querySplit(pValue);

    if (pValue.length >= 1) {
      setClearBtn(true);
      setQuerySplited(querySplit(pValue));
    } else {
      setClearBtn(false);
      setQuerySplited([]);
    }

    //TODO: trocar por whitespaceCleaner do investira.sdk/strings
    const xValue = pValue && pValue.trim().replace(/\s+/g, " ");

    if (timeout) {
      clearTimeout(timeout);
    }

    timeout = setTimeout(() => props.onChange && props.onChange(xValue), 200);
  };

  const handleFilter = () => {
    props.onClickFilter && props.onClickFilter(true);
  };

  const handleDelete = (chipToDelete) => {
    const filtered = querySplited.filter((xValue) => {
      return xValue !== chipToDelete;
    });

    setQuerySplited(filtered);
    updateValue(filtered.join(" "));
  };

  const handleFocus = () => searchRef.current.focus();

  const closeKeyboard = {
    mount: () => {
      document.addEventListener("keydown", (pEvent) => {
        if (searchRef.current && pEvent.keyCode === 13) {
          searchRef.current.blur();
        }
      });
    },
    unmount: () => {
      document.removeEventListener("keydown", (pEvent) => {
        if (searchRef.current && pEvent.keyCode === 13) {
          searchRef.current.blur();
        }
      });
    },
  };

  useImperativeHandle(ref, () => ({
    focus: handleFocus,
    node: searchRef.current,
  }));

  useEffect(() => {
    mount.current && updateValue(props.value || "");
  }, [props.value]);

  useEffect(() => {
    mount.current = true;
    closeKeyboard.mount();

    return () => {
      closeKeyboard.unmount();
    };
  }, []);

  return (
    <Box mb={2} width={"100%"}>
      <Stack
        sx={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "rgba($color: #272D3F, $alpha: 0.5)",
          borderRadius: "8px",
        }}
      >
        <Box flexGrow={1}>
          <FormControl fullWidth>
            <InputBase
              inputRef={searchRef}
              type="search"
              id={props.id}
              value={value}
              onChange={handleChange}
              onFocus={props.onFocus}
              onBlur={props.onBlur}
              placeholder={props.placeholder}
              inputProps={props.inputProps}
              startAdornment={
                !props.onClick ? (
                  <FindIcon
                    iconName={"find"}
                    color={"secondaryLight"}
                    size={18}
                  />
                ) : null
              }
            />
          </FormControl>
        </Box>
        {clearBtn && (
          <IconButton aria-label="busca" onClick={handleClear}>
            <Icon iconName={"cancel"} size={16} />
          </IconButton>
        )}

        {props.onClick && (
          <IconButton aria-label="busca" onClick={props.onClick}>
            <Icon iconName={"find"} />
          </IconButton>
        )}

        {props.filter && (
          <IconButton
            color="primary"
            aria-label="filtro"
            onClick={handleFilter}
          >
            <Icon iconName={"filter"} />
          </IconButton>
        )}
      </Stack>
      {!validators.isEmpty(querySplited) && (
        <div className={Style.querys}>
          {querySplited.map((xData, xIndex) => {
            if (validators.isEmpty(xData)) {
              return null;
            } else {
              return (
                <div className={Style.chip} key={xIndex}>
                  <Chip
                    variant={"outlined"}
                    color={"primary"}
                    label={xData}
                    size={"small"}
                    onDelete={() => handleDelete(xData)}
                  />
                </div>
              );
            }
          })}
        </div>
      )}
    </Box>
  );
});

SearchBox.propTypes = {
  id: PropTypes.string,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  inputProps: PropTypes.object,
  filter: PropTypes.bool,
  forwardRef: PropTypes.func,
};

SearchBox.defaultProps = {
  filter: false,
  id: "searchbox",
};

export default React.memo(SearchBox);
