import React, { memo, useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { validators } from "investira.sdk";
import {
  CrudContext,
  DeckContext,
  Icon,
  Button,
  Typography,
  DialogContentText,
  CenterInView,
} from "../";

import Style from "./Crood.module.scss";

const Crood = memo(
  Object.assign(
    (props) => {
      // Verifica se há o HOC withDialog
      if (!props.onOpenDialog) {
        console.error('"Crood" não está decorado com o HOC "withDialog".');

        return props.children;
      }

      // const initialStateDialog = {
      //     isOpen: false,
      //     title: null,
      //     content: null,
      //     actions: []
      // };

      const [deleted, setDeleted] = useState(false);
      const [editable, setEditable] = useState(false);

      const crudContext = useContext(CrudContext);
      const deckContext = useContext(DeckContext);

      const { onNextView, onPrevView, prevView, onReset } = deckContext || {};

      const onConfirmDelete = (pData, pCallback) => {
        const { itemData, onDelete } = crudContext;
        const xData = pData || itemData;
        if (deckContext) {
          onDelete(xData, {
            resolve: () => {
              props.onSuccess();
              //handleCloseDialog();
              pCallback && pCallback();
              !validators.isEmpty(prevView) && setDeleted(true);
              setTimeout(() => {
                onPrevView();
                crudContext.onReadOne({});
              }, 300);
            },
            reject: () => {
              props.onError();
              console.error("delete error");
              crudContext.onReadOne({});
            },
          });
        } else {
          onDelete(xData, {
            resolve: () => {
              props.onSuccess();
              crudContext.onReadOne({});
              pCallback && pCallback();
            },
            reject: () => {
              props.onError();
              setDeleted(true);
              crudContext.onReadOne({});
            },
          });
        }
      };

      const onConfirmCreate = (pData, pActions) => {
        crudContext.onCreate(pData, {
          ...pActions,
          onNextView,
          onPrevView,
          onReset,
          prevView,
        });
      };

      const onConfirmUpdate = (pData, pActions) => {
        crudContext.onUpdate(pData, {
          ...pActions,
          onNextView,
          onPrevView,
          onReset,
          prevView,
          onCloseDialog: handleCloseDialog,
          onSuccessDialog: handleSuccessDialog,
          onErrorDialog: handleErrorDialog,
          onReadOne: crudContext.onReadOne,
        });
      };

      const handleOpenDialog = ({
        title,
        content,
        actions,
        messages,
        data,
      }) => {
        props.onOpenDialog({
          title,
          content,
          actions,
          messages,
          retryAction: () => onConfirmDelete(data),
        });
      };

      const handleCloseDialog = () => {
        props.onCloseDialog();
      };

      const handleDeleteDialog = (pProps = {}) => {
        const { message, data, title, labelButton, messages, callback } =
          pProps;
        handleOpenDialog({
          title: {
            label: title || "Está certo disto?",
            onclose: true,
          },
          content: (
            <DialogContentText variant={"body2"}>
              {message ||
                props.deleteMessage ||
                "Este item será excluído permanentemente."}
            </DialogContentText>
          ),
          actions: [
            {
              label: labelButton || "Excluir",
              onClick: () => onConfirmDelete(data, callback),
            },
          ],
          messages,
          data,
        });
      };

      const handleSuccessDialog = () => {
        props.onSuccess && props.onSuccess();
      };

      const handleErrorDialog = () => {
        props.onError && props.onError();
      };

      const handleEdit = () => {
        setEditable(!editable);
      };

      const childrenWithProps = React.Children.map(props.children, (child) => {
        if (React.isValidElement(child)) {
          const { children, ...otherProps } = props;
          const { itemData, onReadOne, customActions } = crudContext;
          return React.cloneElement(child, {
            ...otherProps,
            ...customActions,
            itemData,
            onReadOne,
            onConfirmDelete,
            onConfirmCreate,
            onConfirmUpdate,
            handleDeleteDialog,
            handleOpenDialog,
            handleCloseDialog,
            handleSuccessDialog,
            handleErrorDialog,
          });
        }
        console.error("CRUD: Componente filho inválido");
        return null;
      });

      const editWithProps = () => {
        const Component = props.editFormComponent;
        const { itemData, onReadOne } = crudContext;
        const xProps = {
          initialValues: itemData,
          onReadOne,
          onConfirmUpdate,
          onCancelUpdate: handleEdit,
        };
        if (props.editFormComponent) {
          return <Component {...xProps} />;
        }
        console.error("CRUD: Componente edit inválido");
        return null;
      };

      //Reinicia estado do crud caso a navegação do tipo deck reinicie
      useEffect(() => {
        if (validators.isEmpty(prevView)) {
          setEditable(false);
          setDeleted(false);
        }
      }, [prevView]);

      return (
        <>
          <div className={Style.root}>
            {deleted ? (
              <main className={Style.main}>
                <CenterInView>
                  <Typography
                    align={"center"}
                    color={"textSecondary"}
                    component={"p"}
                    variant={"caption"}
                  >
                    Excluído com sucesso
                  </Typography>
                </CenterInView>
              </main>
            ) : (
              <>
                <main className={Style.main}>
                  {editable ? editWithProps() : childrenWithProps}
                </main>

                {props.showActions && (
                  <nav className={Style.nav}>
                    {crudContext.onDelete && !editable && (
                      <Button
                        onClick={handleDeleteDialog}
                        startIcon={
                          <Icon
                            iconName={"delete"}
                            color={"primary"}
                            size={22}
                          />
                        }
                        color={"primary"}
                        variant={"text"}
                      >
                        Excluir
                      </Button>
                    )}

                    {crudContext.onUpdate && !editable && (
                      <Button
                        onClick={handleEdit}
                        startIcon={
                          <Icon
                            iconName={editable ? "cancel" : "edit"}
                            color={"primary"}
                            size={22}
                          />
                        }
                        color={"primary"}
                        variant={"outlined"}
                      >
                        {"Editar"}
                      </Button>
                    )}
                  </nav>
                )}
              </>
            )}
          </div>
        </>
      );
    },
    { displayName: "Crood" }
  )
);

Crood.propTypes = {
  mode: PropTypes.string,
  showActions: PropTypes.bool,
};

Crood.defaultProps = {
  showActions: true,
};

export default Crood;
