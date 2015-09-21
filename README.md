Jupiter
======

Integrated Surveillance Portal with Data Element metadata and DataSet merging

# Quick setup guide
* Install and run [Neo4J](http://www.neo4j.org/download) preferably the latest 2.0.* release
* Run the import.txt from [apollo_root]/data/ according to the import_instructions
* For change management, install [mongoDB](https://www.mongodb.org/downloads) and run mongorestore on the [apollo_root]/data/apollo directory
* Install node.js
* Navigate to [apollo_root]/src/ and run 'npm install'
* Then run 'node app.js' from [apollo_root]/src/

# Requirements
* To View: JQuery 1.10.2 compatible browser (Internet Explorer 8+, Edge, Firefox, Opera, Chrome)
* To Run: 
** Node.js
** Neo4j


## Handy things to npm install -g
* forever (forever start/stop/list [app.js] to run/stop/list-running-apps given node.js application as a service in background)
* nodemon (start and run [app.js], runs node [app.js] in perpetuity.  Automatically restarts upon changing system js files)
* MongoDB (for change management)

##Documentation
* Integrated Surveillance Portal [Confluence](http://code.phiresearchlab.org/confluence/pages/viewpage.action?pageId=9797792)
* Server code is located in src.  To run, clone this project, move into the src directory, npm install, then node app.js
* Data for Neo4J database is loaded in Data.  To run, clone this project, move into the data directory, then cat ./import.txt | [path-to-your-neo4j-shell]/neo4j-shell (read the import instructions for further instructions).

##Issue Tracker
* Integrated Surveillance Portal [Jira](https://code.phiresearchlab.org/jira/browse/AP)

## Roadmap
* BiWeekly sprint to build out Data Element Metadata and DataSet Merge Tools

## Contributing
Anyone is encouraged to contribute to the project by [forking](https://help.github.com/articles/fork-a-repo) and submitting a pull request. (If you are new to GitHub, you might start with a [basic tutorial](https://help.github.com/articles/set-up-git).) 

By contributing to this project, you grant a world-wide, royalty-free, perpetual, irrevocable, non-exclusive, transferable license to all users under the terms of the [Apache Software License v2](http://www.apache.org/licenses/LICENSE-2.0.html) or later.

All comments, messages, pull requests, and other submissions received through CDC and PHIResearchLab.org pages including this GitHub page are subject to the Presidential Records Act and may be archived. Learn more http://cdc.gov/privacy

##Hat-tips

[Issac G](https://github.com/issacg/mocha-demo/) for creating an awesome starting point for testing with Mocha and CI with Bamboo
[Pluralsight's awesome node.js tutorial](http://pluralsight.com/training/courses/TableOfContents?courseName=building-angularjs-nodejs-apps-mean&highlight=) 
[Pluralsight's awesome express tutorial](http://pluralsight.com/training/courses/TableOfContents?courseName=expressjs&highlight=hadi-hariri_expressjs-m2*2!hadi-hariri_expressjs-m5*6#expressjs-m2)
[HTML to  Jade Converter](http://html2jade.aaron-powell.com/)
[Matt Wiebe's unCamelCase JavaScript](https://gist.github.com/mattwiebe/1005915)
## License

This project constitutes a work of the United States Government and is not subject to domestic copyright protection under 17 USC § 105.

The project utilizes code licensed under the terms of the Apache Software License and therefore is licensed under ASL v2 or later.

This program is free software: you can redistribute it and/or modify it under the terms of the Apache Software License version 2, or (at your option) any later version.

This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the Apache Software License for more details.

You should have received a copy of the Apache Software License along with this program. If not, see http://www.apache.org/licenses/LICENSE-2.0.html

## Privacy

This project contains only non-sensitive, publicly available data and information. All material and community participation is covered by the PHIResearchLab.org [Disclaimer](http://www.phiresearchlab.org/index.php?option=com_content&view=article&id=26&Itemid=15) and [Code of Conduct](http://www.phiresearchlab.org/index.php?option=com_content&view=article&id=27&Itemid=19). For more information about CDC's privacy policy, please visit http://www.cdc.gov/privacy.html
