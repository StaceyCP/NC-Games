import { useContext } from "react";
import { ErrorContext } from "../contexts/Error";

function Modal() {
    const {error, setShowModal} = useContext(ErrorContext)
    return (
        <section className="modal">
            <article>
                <h3>{error}</h3>
                <button type="button" onClick={() => {
                    setShowModal(false)
                }}>Okay</button>
            </article>
        </section>
    );
}

export default Modal;