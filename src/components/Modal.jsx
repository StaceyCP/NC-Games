function Modal({text, setShowModal}) {
    return (
        <section className="modal">
            <article>
                <h3>{text}</h3>
                <button type="button" onClick={() => {
                    setShowModal(false)
                }}>Okay</button>
            </article>
        </section>
    );
}

export default Modal;