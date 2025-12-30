// External Library Import
import Swal from "sweetalert2";

class AlertMessage {
    // Delete File with Permanent Option
    static DeleteFile(arg, request) {
        return Swal.fire({
            title: ("are you sure"),
            text: ("you wont be able to revert this"),
            icon: "warning",
            input: "checkbox",
            inputPlaceholder: ("delete permanently"),
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: ("yes delete"),
        }).then((result) => {
            if (!result.isConfirmed) return;

            const permanent = result.value === 1; // checkbox = 1 (checked)

            if (Array.isArray(arg?.mediaIds)) {
                return request({
                    mediaIds: arg.mediaIds,
                    store: arg.store,
                    permanent,
                });
            }

            return request({
                ...arg,
                permanent,
            });
        });
    }

    // Simple Delete Confirmation
    static Delete(id, request) {
        return Swal.fire({
            title: ("are you sure"),
            text: ("you wont be able to revert this"),
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#615FFF",
            cancelButtonColor: "#d33",
            confirmButtonText: ("yes delete"),
        }).then((result) => {
            if (result.isConfirmed) {
                return request(id);
            }
        });
    }

    // Update Status (Dropdown Input)
    static Update(email, status, option, request) {
        return Swal.fire({
            title: ("change status"),
            input: "select",
            inputOptions: option,
            inputValue: status,
            showCancelButton: true,
        }).then((result) => {
            if (result.isConfirmed) {
                return request(email, result.value);
            }
        });
    }

    // Success Toast
    static SuccessFul(message) {
        return Swal.fire({
            toast: true,
            position: "top",
            icon: "success",
            title: message,
            showConfirmButton: false,
            timer: 3000,
        });
    }
}

export default AlertMessage;
