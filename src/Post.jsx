

export default function Post() {

    return (<div class="card my-5">
        <div class="card-header d-flex justify-content-between">
            <div> JavaScript</div>
            <div> {new Date().toLocaleTimeString()}</div>
        </div>
        <div class="card-body">
            <h5 class="card-title">Card title</h5>
            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
        </div>
    </div>)
}