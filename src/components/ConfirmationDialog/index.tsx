import Modal from "react-modal";

import { styled } from "@mui/material/styles";

const StyledModal = styled(Modal)`
  color: black;
`;

export function ConfirmationDialog({
  isOpen,
  onClose,
  text,
  yesText,
  noText,
  onYes,
  onNo,
}: {
  isOpen: boolean;
  onClose: () => void;
  text: string;
  yesText?: string;
  noText?: string;
  onYes?: () => void;
  onNo?: () => void;
}) {
  return (
    <>
      <StyledModal
        isOpen={isOpen}
        onRequestClose={onClose}
        contentLabel="Confirmation Dialog"
      >
        <p>{text}</p>
      </StyledModal>
    </>
  );
}
