/* eslint-disable react/prop-types */

const ViewProcessModal = ({
  handleUpdateProcess,
  modalProcess,
  setModalProcess,
  inputRef,
}) => {
  return (
    <div>
      <dialog
        id="view_process_modal"
        className="modal modal-bottom sm:modal-middle"
      >
        <div className="modal-box">
          <h3 className="font-bold text-lg my-4">
            View Process: {modalProcess?._id}
          </h3>
          <input
            ref={inputRef}
            type="text"
            defaultValue={modalProcess?.name}
            className="input input-bordered input-sm w-full max-w-xs"
          />

          <div className="modal-action">
            <button
              className="btn"
              onClick={() => {
                document.getElementById("view_process_modal").close();
                setModalProcess(null);
              }}
            >
              Close
            </button>
            <button
              className="btn"
              onClick={() => {
                handleUpdateProcess(modalProcess?._id);
              }}
            >
              Update
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default ViewProcessModal;
