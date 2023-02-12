function Loading({component}) {
    return (
        <>
            <div class="lds-grid"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
            <h2>{component} loading...</h2>
        </>
    );
}

export default Loading;