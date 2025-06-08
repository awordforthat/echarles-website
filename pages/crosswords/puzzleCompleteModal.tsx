import React from 'react';
import styles from './completionModal.module.scss';

type ModalProps = {
  title: string;
  message: string;
  onClose: () => void;
};

const CompletionModal: React.FC<ModalProps> = ({ title, message, onClose }) => {
  return (
    <div className={styles.backdrop}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h2>{title}</h2>
        </div>
        <div className={styles.body}>
          <p>{message}</p>
        </div>
        <div className={styles.footer}>
          <button onClick={onClose}>OK</button>
        </div>
      </div>
    </div>
  );
};

export default CompletionModal;
