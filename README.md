# Food Analytica : John Doe vs The food industry

# Abstract
John Doe is an entrepreneur that recently came across a large capital. He is fascinated by the food industry and dreams of launching his own company in this field. Food and agriculture are part of a huge industry controlled by many multinational companies and presenting many economic and social challenges. As a good entrepreneur, John hired Infiniteam to conduct a data-driven market study, in order to analyse the food industry, extract the most popular products and identify consumer trends and relevant markets. The aim of this project is to be able to propose, through data analysis, lists of products, ingredients to be used as well as types of consumers to target, so that John could start a successful business and offer significant value to his customers.
In order to conduct this study, we will use Dunnhumby dataset which provides us with information regarding existing food products, their sale value as well as the types of consumers interested in them. We also intend to use Open Food Facts dataset in order to obtain data regarding the ingredients used in each product but also their energy balance.

# Research questions
- What are the main consumption habits of the food industry consumers?
- What are the ingredients list of the most popular processed products?
- Do brands focus on a specific category of products? If so, does this pattern get reflected in the ingredients?
- What portfolio of products would bring value to consumers by reducing production costs and proposing low prices? How to choose ingredients for these products in order to encourage healthy nutrition?
- What can we offer more or make better in order to distinguish ourselves from the competition, and address food related social issues?

# Dataset
We are going to use the **Open Food Facts Database** and **Dunnhumby Dataset**. 

The Open Food Facts database references one million food products along with associated information such as category, ingredients or nutritive value. It is an open database in which everyone can contribute through the OpenFoodFacts App, and which can be used to make better food choices. The data is then daily compiled into a properly formatted CSV document. Since it is an open database, the entries may be incomplete, partially filled or even erroneous/nonsensical. More specifically the fields are sparsely filled and in addition to that, most of the products are from France and the United States. Some columns are not well formatted and need to be pre-processed (for instance by performing a case disjunction). Finally, a non negligible amount of rows have obvious inconsistencies, which raises the question of how to detect the less obvious ones.

The Dunnhumby Dataset consists of anonymized shopping data from 2,500 households and spanning over two years. The data is well formatted and seems to require no pre-processing at all. It contains generic information about the household and their transactions in groceries, broad description of the products, and details about the potential discounts coupons that were redeemed. The main drawback when conducting data analyses on this dataset is the inherently anonymous nature of the data, which prevents us (for example) to obtain identifiable details about the products such as a reference id or a brand name. The labels have therefore a lesser accurate meaning.

# A list of internal milestones up until project milestone 2
- Preprocessing:
    - Filter columns of interest: drop unnecessary data to simplify processing and reduce memory usage
    - Sanitization and reformatting:
        - As everyone can contribute to the Open Food Facts database, it may contain typos or errors which should be detected and cleaned before doing any serious analysis on it
        - Reformat the unexploitable columns (ie. in Open Food Facts: weight, ingredients, allergens)
    - Find ways to enrich our data by taking advantage of the different types of information given in the two datasets.
- Descriptive Analysis:
    - Describe the food market from the available data
    - Identify key patterns in the data that will guide our study and start drawing conclusions:
        - Spot correlations between the different attributes that we have access to
        - Does the Coupon strategy work and affects the consumption of these products?

# Questions for TAs
- Is the business case aproach valid for the project?
- In the _Open Food Facts Database_, could the columns `created_t` and `created_datetime` be relevant indicators of the product's market launch date? (even though they correspond to the time when the product was added to the database by a contributor)


