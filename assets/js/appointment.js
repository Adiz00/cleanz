/*
*
* Appointment JS
* @ThemeEaster
*/
$(function() {
    // Get the form.
    var form = $('#ajax_appointment');

    // Get the messages div.
    var formMessages = $('#form-messages');

    // Set up an event listener for the contact form.
	$(form).submit(function(event) {
		// Stop the browser from submitting the form.
		event.preventDefault();

		// Serialize the form data.
		var formData = $(form).serialize();
		// Submit the form using AJAX.
		$.ajax({
			type: 'POST',
			url: $(form).attr('action'),
			data: formData,
			dataType: 'json',
			headers: {
				'Accept': 'application/json'
			}
		})
		.done(function(response) {
			// Make sure that the formMessages div has the 'success' class.
			$(formMessages).removeClass('alert-danger');
			$(formMessages).addClass('alert-success');

			// Set the message text.
			var successMessage = 'Thank you! Your appointment request has been sent successfully.';
			if (response && response.message) {
				successMessage = response.message;
			}
			$(formMessages).text(successMessage);

			// Clear the form.
			$('#name').val('');
			$('#email').val('');
			$('#services').val('');
			$('#sf').val('');
			$('#phone').val('');
			$('#zip').val('');
			$('#address').val('');
		})
		.fail(function(data) {
			// Make sure that the formMessages div has the 'error' class.
      $(formMessages).removeClass('alert-success');
			$(formMessages).addClass('alert-danger');

			// Set the message text.
			var errorMessage = 'Sorry, something went wrong. Please try again later.';
			if (data.responseJSON && data.responseJSON.error) {
				errorMessage = data.responseJSON.error;
			} else if (data.responseText !== '') {
				errorMessage = data.responseText;
			}
			$(formMessages).text(errorMessage);
		});

	});

});
