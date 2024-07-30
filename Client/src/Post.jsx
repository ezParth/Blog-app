export default function Post(){
    return (
        <div className="post">
        <div className="image">
          <img
            src="https://techcrunch.com/wp-content/uploads/2022/01/GettyImages-1314979456.jpg?resize=1200,675"
            alt="img"
          />
        </div>
        <div className="content">
          <h2>NIST releases a tool for testing AI model risk</h2>
          <p className="info">
            <a href="" className="author">
              Parth Singh
            </a>
            <time dateTime="">2023-01-06 16:45</time>
          </p>
          <p className="summary">
            The National Institute of Standards and Technology (NIST), the U.S.
            Commerce Department agency that develops and tests tech for the U.S.
            government, companies and the broader public, has re-released a
            testbed designed to measure how malicious attacks.
          </p>
        </div>
      </div>
    )
}