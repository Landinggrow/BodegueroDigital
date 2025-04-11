import React, { useState } from "react";
import Button from "./Button";
import Modal from "./Modal";

const DemoSection = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    console.log("Abrir Modal");
    setModalOpen(true);
  };

  const closeModal = () => {
    console.log("Cerrar Modal");
    setModalOpen(false);
  };

  return (
    <div>
      {/* El botón debe pasar la función openModal */}
      <Button onClick={openModal} />
      {/* El modal debe recibir el estado y la función para cerrarlo */}
      <Modal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};

export default DemoSection;
