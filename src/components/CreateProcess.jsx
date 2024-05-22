import { useRef } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const CreateProcess = () => {
  const inputRef = useRef();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const process = {
      name: inputRef.current.value,
      currentTime: new Date(),
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/createprocess",
        process
      );
      if (response.data.status === "success") {
        toast.success("Processes added successfully!");
      }
    } catch (error) {
      console.error("There was an error creating the process!", error);
    }

    inputRef.current.value = "";
  };

  return (
    <div>
      <div className="hero">
        <div className="hero-content flex-col">
          <div className="card w-full shadow-2xl bg-base-100">
            <form onSubmit={handleSubmit} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Process Name :</span>
                </label>
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Process..."
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control mt-2">
                <button
                  type="submit"
                  className="btn btn-primary uppercase font-bold"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateProcess;
