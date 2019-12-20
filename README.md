# Food Analytica : Social status vs Healthiness

## Abstract
Each one of us has a nutrition routine, favourite foods, preferred drinks, ingredients of choice, beloved seasonning, etc. These preferences depend on our lifestyle, whether we choose to eat healthy, or follow a diet, or have a guilty pleasure for sweets. But our nutrition is not only based on our choices or preferences of food.Also, foods labeled as healthy are not always attractive to all social classes.<br>
The aim of this study is to evaluate how our social status influences the way we eat, if indicators like age, income or more generally "social status"  have an impact on our nutrition. Using demographic, purchase as well as food products descriptions data, Infiniteam decided to tackle this question by analysing correlations between households social status and their consumed food products.<br>
In order to do this, we use two datasets : Dunnhumby and OpenFoodFacts. The first one provides demographic information on 2500 households, their food products purchases during approximately 2 years as well as the sales value of these products. The second offers valuable description of various food products, their composition, their nutrition grade, etc.<br> 
The idea is to complete the Dunnhumby dataset by adding to products purchased by households information about their ingredients and nutritive value, in order to evaluate the healthiness of the food product.<br>
In this regard, we established our definition of a social status, of a healthy product and we finally identified in this project a precise correlation or trend appearing between those two definitions. 

## Research questions
- What are the main consumption habits of consumers?
- What defines a social status ?
- What defines a "healthy product" ?
- What is the correlation between dangerous food aspects and nutrition grade ? 
- Is there a correlation between social status and dietary habits?

## Datasets
We are going to use the **Open Food Facts Database** and **Dunnhumby Dataset**. 

The Open Food Facts database references one million food products along with associated information such as category, ingredients or nutritive value. It is an open database in which everyone can contribute through the OpenFoodFacts App, and which can be used to make better food choices. The data is then daily compiled into a properly formatted CSV document. Since it is an open database, the entries may be incomplete, partially filled or even erroneous/nonsensical. More specifically the fields are sparsely filled and in addition to that, most of the products are from France and the United States. Some columns are not well formatted and need to be pre-processed (for instance by performing a case disjunction). Finally, a non negligible amount of rows have obvious inconsistencies, which raises the question of how to detect the less obvious ones.

The Dunnhumby Dataset consists of anonymized shopping data from 2,500 households and spanning over two years. The data is well formatted and seems to require no pre-processing at all. It contains generic information about the household and their transactions in groceries, broad description of the products, and details about the potential discounts coupons that were redeemed. The main drawback when conducting data analyses on this dataset is the inherently anonymous nature of the data, which prevents us (for example) to obtain identifiable details about the products such as a reference id or a brand name. The labels have therefore a lesser accurate meaning.

## Usage Instructions

1) Open the notebook on the project's current folder :

	```
	Milestone_3.ipynb
	```

2) Alternatively, open the notebook on nb-viewer or in its html format, in order to view our plotly visualizations :

	```
	Milestone_3.html
	``` 
or :
	```
	lien
	```

3) Go to the link for our datastory :

	```
	jalil-M.github.io
	```


## A list of internal milestones up until project milestone 3
- Improve and deepen our analysis.
- Consistency of the analysis of the new results after crossing the two datasets
- Extract new informations on quality of food consumed by each social class.
- Continue exploring the data using other visualisation tools.
- Identify patterns in food consumption depending on the social status

## Contributions
- Abdeljalil Moussa : 1
- Florian Cassayre : 2
- Smail Ait Bouhsain : 3
- Ismail Nejjar : zab

## Thank you for your attention !
