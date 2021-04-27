import React from 'react';
import Content from './components/Content';
import Header from './components/Header';
import Part from './components/Part';
import Total from './components/Total';
import { courseParts } from './data/courseData';

function App() {
    const courseName = 'Half Stack application development';

    return (
        <div>
            <Header courseName={courseName} />
            <Content courseParts={courseParts} />
            <Total courseParts={courseParts} />
            <Part courseParts={courseParts} />
            <Total courseParts={courseParts} />
        </div>
    );
}

export default App;
