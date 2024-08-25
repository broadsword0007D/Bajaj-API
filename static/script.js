// document.getElementById('jsonForm').addEventListener('submit', function(event) {
//     event.preventDefault(); // Prevent the form from submitting the traditional way

//     const jsonInput = document.getElementById('jsonInput').value;
//     const responseContainer = document.getElementById('responseContainer');
//     responseContainer.style.display = 'none'; // Hide response initially

//     let parsedData;
//     try {
//         parsedData = JSON.parse(jsonInput);
//         if (!Array.isArray(parsedData.data)) {
//             throw new Error("Invalid data format");
//         }
//     } catch (error) {
//         responseContainer.style.display = 'block';
//         responseContainer.className = 'alert alert-danger';
//         responseContainer.innerHTML = 'Invalid JSON format or structure.';
//         return;
//     }

//     // Simulating backend response
//     const user_id = "john_doe_17091999"; // Hardcoded for this example
//     const email = "john@xyz.com";         // Hardcoded for this example
//     const roll_number = "ABCD123";        // Hardcoded for this example

//     const numbers = parsedData.data.filter(item => !isNaN(item));
//     const alphabets = parsedData.data.filter(item => /^[A-Za-z]$/.test(item));
//     const lowercaseAlphabets = alphabets.filter(item => /^[a-z]$/.test(item));
//     const highestLowercase = lowercaseAlphabets.length > 0 ? [lowercaseAlphabets.sort().pop()] : [];

//     const response = {
//         "is_success": true,
//         "user_id": user_id,
//         "email": email,
//         "roll_number": roll_number,
//         "numbers": numbers,
//         "alphabets": alphabets,
//         "highest_lowercase_alphabet": highestLowercase
//     };

//     // Get selected filter options
//     const selectedOptions = Array.from(document.querySelectorAll('.filterOption:checked')).map(el => el.value);

//     let filteredResponse = `<p><strong>User ID:</strong> ${response.user_id}</p>`;
//     filteredResponse += `<p><strong>Email:</strong> ${response.email}</p>`;
//     filteredResponse += `<p><strong>Roll Number:</strong> ${response.roll_number}</p>`;

//     if (selectedOptions.includes('numbers')) {
//         filteredResponse += `<p><strong>Numbers:</strong> ${response.numbers.join(', ')}</p>`;
//     }
//     if (selectedOptions.includes('alphabets')) {
//         filteredResponse += `<p><strong>Alphabets:</strong> ${response.alphabets.join(', ')}</p>`;
//     }
//     if (selectedOptions.includes('highest_lowercase_alphabet')) {
//         filteredResponse += `<p><strong>Highest Lowercase Alphabet:</strong> ${response.highest_lowercase_alphabet.join(', ')}</p>`;
//     }

//     responseContainer.style.display = 'block';
//     responseContainer.className = 'alert alert-success';
//     responseContainer.innerHTML = filteredResponse || '<p>No options selected.</p>';
// });

document.getElementById('jsonForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting the traditional way

    const jsonInput = document.getElementById('jsonInput').value;
    const responseContainer = document.getElementById('responseContainer');
    responseContainer.style.display = 'none'; // Hide response initially

    let parsedData;
    try {
        parsedData = JSON.parse(jsonInput);
        if (!Array.isArray(parsedData.data)) {
            throw new Error("Invalid data format");
        }
    } catch (error) {
        responseContainer.style.display = 'block';
        responseContainer.className = 'alert alert-danger';
        responseContainer.innerHTML = 'Invalid JSON format or structure.';
        return;
    }

    // Create a POST request to your backend endpoint
    fetch('https://https://bajaj-api-km55.onrender.com/bfhl', { // Replace with your backend URL
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(parsedData)
    })
    .then(response => response.json())
    .then(data => {
        // Assuming the response data follows the required structure
        const selectedOptions = Array.from(document.querySelectorAll('.filterOption:checked')).map(el => el.value);

        let filteredResponse = `<p><strong>User ID:</strong> ${data.user_id}</p>`;
        filteredResponse += `<p><strong>Email:</strong> ${data.email}</p>`;
        filteredResponse += `<p><strong>Roll Number:</strong> ${data.roll_number}</p>`;

        if (selectedOptions.includes('numbers')) {
            filteredResponse += `<p><strong>Numbers:</strong> ${data.numbers.join(', ')}</p>`;
        }
        if (selectedOptions.includes('alphabets')) {
            filteredResponse += `<p><strong>Alphabets:</strong> ${data.alphabets.join(', ')}</p>`;
        }
        if (selectedOptions.includes('highest_lowercase_alphabet')) {
            filteredResponse += `<p><strong>Highest Lowercase Alphabet:</strong> ${data.highest_lowercase_alphabet.join(', ')}</p>`;
        }

        responseContainer.style.display = 'block';
        responseContainer.className = 'alert alert-success';
        responseContainer.innerHTML = filteredResponse || '<p>No options selected.</p>';
    })
    .catch(error => {
        responseContainer.style.display = 'block';
        responseContainer.className = 'alert alert-danger';
        responseContainer.innerHTML = 'Error processing the request. Please try again later.';
    });
});
