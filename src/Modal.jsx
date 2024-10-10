import './modal.css'

export default function Modal({ showRegister }) {


  return (
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog  modal-dialog-centered">
        <div class="modal-content">

          <div class="modal-body">
            <form>

              
              <h1 class="h3 mb-3 fw-normal">Please sign in</h1>

              <div class="">
                <label for="floatingInput">Username</label>
                <input type="email" class="form-control mb-3" id="floatingInput" placeholder="name@example.com" />

              </div>
              <div class="">
                <label for="floatingPassword">Password</label>
                <input type="password" class="form-control" id="floatingPassword" placeholder="Password" />

              </div>


              <button class="w-25 btn custom-button mt-2" type="submit">Sign in</button>

            </form>
          </div>

        </div>
      </div>
    </div>)
}