<script>

export default {

    data(){
        return {}
    }
}
</script>

<template>

    <div class="content">

        <h1> Upload Sensor Data </h1>
        <h1> Instructions </h1>

        <main>
        <p class="para">
            To include your sensor data on our site, click the 'Google Form' button below and complete the form. In the form, you can upload your sensor data as an Excel file. One of the columns in the Excel spreadsheet uploaded must be labeled ‘timestamp’. Please allow us a week to process and integrate your data into our site. If you encounter any difficulties or have questions, feel free to reach out via email at <a href="mailto:rowlesresearch@gmail.com" class="email-link">rowlesresearch@gmail.com</a>.
        </p>
        </main>

        <h2> <a class="form-button" href="https://forms.gle/waJSYXe8xUxVdGU18" target="_blank" >Google Form </a></h2>

        


    </div>



</template>

<style scoped>

.para{

    margin:auto;
    width:80%;
    text-align: center;
    font-size: 1.3em;
    color: #333;
}
p a.email-link {
    color: #3498db; /* Light blue color for the email link */
    text-decoration: none;
    border-bottom: 1px dotted #3498db; /* Dotted underline for the email link */
    transition: color 0.3s;
}

/* Hover effect for the email link */
p a.email-link:hover {
    color: #1f618d; /* Slightly darker blue color on hover */
}

.template-button {
    display: inline-block;
    padding: 10px 20px;
    font-size: 1em;
    text-align: center;
    text-decoration: none;
    border: 2px solid #4CAF50; /* Green border */
    color: #4CAF50; /* Green text color */
    border-radius: 5px;
    transition: background-color 0.3s, color 0.3s;
    cursor: pointer;

}

/* Hover effect for the button */
.template-button:hover {
    background-color: #4CAF50; /* Green background on hover */
    color: white; /* White text color on hover */
}

.form-button {
    display: inline-block;
    padding: 10px 20px;
    font-size: 1em;
    text-align: center;
    text-decoration: none;
    border: 2px solid #3498db; /* Light blue border */
    color: #3498db; /* Light blue text color */
    border-radius: 5px;
    transition: background-color 0.3s, color 0.3s;
    cursor: pointer;
    margin-bottom: 10px;
    
}

/* Hover effect for the button */
.form-button:hover {
    background-color: #3498db; /* Light blue background on hover */
    color: white; /* White text color on hover */
}

.content {
            text-align: center;
            font-family: 'Arial', sans-serif;
            line-height: 1.6;
            margin: 0;
            padding-top:10px;
        }

        

main {
    margin: 20px;
}




</style>