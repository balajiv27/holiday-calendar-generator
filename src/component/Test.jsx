import React, { useState, useEffect } from "react";

const Test = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Function to fetch data from the API
    const fetchData = async () => {
      try {
        // Make a GET request using the fetch function
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/posts"
        );

        // Check if the request was successful (status code 200-299)
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        // Parse the JSON data
        const result = await response.json();

        // Update state with the fetched data
        setData(result);
        setLoading(false);
      } catch (error) {
        // Handle errors
        setError(error);
        setLoading(false);
      }
    };

    // Call the fetch function
    fetchData();
  }, []); // The empty dependency array ensures that the effect runs once when the component mounts

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {data && (
        <div>
          <h1>Data from API:</h1>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default Test;
