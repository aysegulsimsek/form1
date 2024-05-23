function dogrula() {
    let isValid = true;

    const form = document.forms["form1"];
    const inputs = ["fullname", "email", "tel", "subject", "message"];

    inputs.forEach(inputName => {
        const inputElement = form[inputName];
        const errorText = inputElement.nextElementSibling;

        if (inputElement.value.trim() === "") {
            errorText.style.display = "flex";
            isValid = false;
        } else {
            errorText.style.display = "none";
        }
    });

    if (isValid) {
        sendEmail();
    }

    return false;
}


function sendEmail() {
    const form = document.forms["form1"];
    const submitButton = form.querySelector('button[type="submit"]');
    submitButton.disabled = true; // Disable the button to prevent multiple submissions

    const data = {
        service_id: 'service_x3jt1ea',
        template_id: 'template_x3uxr17',
        user_id: 'J1qDxZzas-tKyWSfp',
        template_params: {
            'username': form['fullname'].value,
            'g-recaptcha-response': '03AHJ_ASjnLA214KSNKFJAK12sfKASfehbmfd...',
            'email': form['email'].value,
            'tel': form['tel'].value,
            'subject': form['subject'].value,
            'message': form['message'].value
        }
    };

    $.ajax('https://api.emailjs.com/api/v1.0/email/send', {
        type: 'POST',
        data: JSON.stringify(data),
        contentType: 'application/json'
    }).done(function() {
        const success = document.querySelector('.success');
        success.classList.add("active");

        // Refresh the page after a delay to allow the user to see the success message
        setTimeout(function() {
            location.reload();
        }, 3000); // Adjust the delay as needed
    }).fail(function(error) {
        alert('Oops... ' + JSON.stringify(error));
        submitButton.disabled = false;
    });
}