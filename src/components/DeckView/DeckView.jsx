import React, { memo, useContext } from "react";
import DeckContext from "../DeckContext";

const DeckView = memo((props) => {
  const deckContext = useContext(DeckContext);
  /* Implementar aqui, uma condição para verificar se a View está ativa. Analisar os possíveis efeitos colaterais. */

  return React.cloneElement(props.children, {
    id: props.id,
    ...deckContext,
  });
});

DeckView.displayName = "DeckView";

export default DeckView;
