---
layout: default
---

<ul class="toc hidden" id="toc">
    <li class="li-bold">
        <a href="#overview"><span class="title">Overview</span></a>
        <span class="chapter"></span>
    </li>
    <li class="li-bold">
        <a href="#social-status-and-product-consumption"><span class="title">Social status and product consumption</span></a>
        <span class="chapter">A</span>
    </li>
    <li>
        <a href="#what-defines-social-status"><span class="title right">What defines social status?</span></a>
        <span class="chapter">A.1</span>
    </li>
    <li>
        <a href="#social-status-vs-food-retail"><span class="title right">Social Status VS Food Retail</span></a>
        <span class="chapter">A.2</span>
    </li>
    <li>
        <a href="#social-status-vs-food-types"><span class="title right">Social Status VS Food types</span></a>
        <span class="chapter">A.3</span>
    </li>
    <li class="li-bold">
        <a href="#healthiness-of-food"><span class="title">Healthiness of food</span></a>
        <span class="chapter">B</span>
    </li>
    <li>
        <a href="#whats-in-our-food"><span class="title right">What's in our food?</span></a>
        <span class="chapter">B.1</span>
    </li>
    <li>
        <a href="#how-relevant-is-the-nutritive-grade"><span class="title right">How relevant is the nutritive grade?</span></a>
        <span class="chapter">B.2</span>
    </li>
    <li class="li-bold">
        <a href="#impact-of-social-status-on-nutritive-health"><span class="title">Impact of social status on nutritive health</span></a>
        <span class="chapter">C</span>
    </li>
    <li>
        <a href="#how-healthy-does-each-class-eat"><span class="title right">How healthy does each class eat?</span></a>
        <span class="chapter">C.1</span>
    </li>
    <li>
        <a href="#social-class-vs-nutrition-grade"><span class="title right">Social class VS Nutrition grade</span></a>
        <span class="chapter">C.2</span>
    </li>
    <li>
        <a href="#social-class-vs-food-composition"><span class="title right">Social class VS Food composition</span></a>
        <span class="chapter">C.3</span>
    </li>
    <li>
        <a href="#correlation-between-social-status-and-nutrition-grade"><span class="title right">Correlation between Social status and nutrition grade</span></a>
        <span class="chapter">C.4</span>
    </li>
</ul>


# Overview

Imagine you are a young data scientist, working at the DLAB and Bob West enters in your office without warning and shouts : "we received two datasets related to food consumption! get to work!" and slams the door.
Consequently, you just woke up from your nap so you open your laptop, and start reading about these datasets. Naturally, you ask yourself :

	- What defines one household's social status?
	- What are the popular key components of our healthiness?
	- Is there a correlation between food consumption and social status?
	- ...what's on BC cafeteria's menu? (looking at food datasets made you hungry...)

But most importantly, this young data scientist is on the verge of having answers to these questions. In fact, this data story will unveil the many analysis and discoveries from our data scientist, through these two datasets (Dunnhummby, and Open Food Facts Databases).<br>
Welcome to a typical day of a DLAB scientist, and this scientist, it is you!     

**Side note:** all our plots are dynamic, feel free to interact with them! It is recommended to use a modern browser on a non-mobile device.

# Social status and product consumption

They say there is no accounting for taste. Each one of us has a favoured nutrition routine, some are big on healthy food. Others are foody and like to serve their palates with as many types of meals as they can. And a lot of us choose to indulge guilty pleasures and disregard how healthy they eat. But what if this isn’t really a choice? What if our social status predetermines the way we eat?

In this article, we analyse the relation between the social status of household and their food consumption habits. We aim to verify if there is an impact of social class on the quality of nutrition, and if so to which extent.

## What defines social status?

The social status is a subjective characterization of a household. It can be related to its wealth, the professional status of a member, the age category, etc. In this analysis, we choose to define the social status using three indicators the income of the household, its age category, as well as the marital status.


## Social Status VS Food Retail

<div id="income-sales"></div>

Let us first take a look at the correlations between the social status of households and the prices of the food products consumed.
In fact, there is a high correlation between the income and the total price of foods bought. Indeed, households with a low income seem to buy in general in general cheap food products. Also, the higher the income, the higher is the budget allocated by the household to food consumption, and the higher the average price paid per product is. Households with an income higher than $125,000 dollars are the ones that pay the most for food and seem to buy expensive products, whilst households with an income lower than $50,000 dollars tend to pay a lot less and go for cheaper products.

## Social Status VS Food types

If there is a disparity of food consumption between social classes, we expect to find that there are some products that are much more consumed by certain households than others.

<div id="purchases-income"></div>

Naturally there are some products that are common to all social classes, which can be qualified as essential needs. These include bananas, milk, eggs and bread.<br>
There also some food products that can be qualified as specific to a social class, since they are much more consumed in one than the others. For example, strawberries seem to be specific to household with high income, we can clearly see that their consumption grows higher with the wealth level of the households. The opposite effect can be observed for Hamburger Buns, which are more consumed in low income households than in the ones with higher income.

<div id="purchases-age"></div>

Using the age as the indicator, Soft Drinks seem to be consumed more by young individuals than by older ones. Also there seems to be a disparity in consumption of essential needs. The consumption of healthy products such as fruits, vegetables and protein rich foods increases with the age. In the same sense, the higher the age category of the household is,  the lower is the consumption of unhealthy products.


# Healthiness of food

What is our food made of? How is unhealthy food characterized? Are there any food categories more likely to be unhealthy?

Those are the questions we asked ourselves. To answer them we analyzed data from the [Open Food Facts](https://openfoodfacts.org) database. The Open Food Facts database references one million food products along with associated information such as category, ingredients or nutritive value. It is an open database in which everyone can contribute through the OpenFoodFacts App, and which can be used to make better food choices.

## What's in our food?

Product labeling plays an important in informing the client about what they are about to consume. All countries have proper government regulation agencies regarding food labeling. And of course, some of them are more/less transparent than others.

First, we started this study by looking at the ingredient list of the products. The information is given as a (usually) unquantified and unordered list of base ingredients. As we will see further on, it is not an absolute measure of healthiness.

<div id="top-ingredients"></div>

As one could expect the three top ingredients are salt, sugar and water. About 15% of products contain citric acid, a compound that can be found in lemon and vinegar but that is also used for food flavoring.

<div id="correlation-ingredients"></div>

What are the combinations of these ingredients? The above plot represents the [phi coefficient](https://en.wikipedia.org/wiki/Phi_coefficient) between each pair of ingredients, a statistical measure of association between two binary variables. For instance, it seems that garlic often comes with other spices, vinegar often combined with food flavoring, and corn syrup with additional sugar. On the other hand salt is less likely to be included with sugar or ascorbic acid. 

Finally, it turns out we can actually characterize food products by only looking at their ingredients. Below you may find the **_map of food_**, a spatial representation of products by their similarity in terms of ingredients. Use the query field to highlight products by their name: `chocolate`, `soda`, `fruit`, `cheese`, ...

<div style="text-align: center; margin-top: 20px">
<form action="#" id="query-form" style="display: inline-block">
  Keyword query: <input type="text" name="query" id="query-text" value="ice cream">
  <input type="submit" value="Highlight">
</form>
</div>
<div id="products-ingredients"></div>

This visualization shows us that names of the products are highly correlated with what they are made of. However correlation is not causality, don't judge a book by its cover! It also highlights marketing strategies used by corporations to trigger positive emotions on the consumer; one of them is by using buzzwords such as `deluxe`, `mix` and `homestyle`.

<div id="correlation-sugars-fat"></div>

In some country and states, it is mandatory to give the detailed quantity of salt, sugar, fat and proteins. This information give us a more accurate insight about the healthiness. For instance here is an interesting property: if a product contains sugar it is likely to either not contain fat at all (sweets) or contain an equivalent amount of fat.

## How relevant is the nutritive grade?

The **_nutri-score_** is an attributed score for a given food product based on the amount of energy, saturated fat, sugar and sodium contained in it. The goal is to inform the consumer about the _nutritive value_. It does not take into account harmful additives!

Because the value of this score is computed by following strict rules, it should technically reflect the same thing in different countries. Right?

<div style="text-align: center; margin-top: 20px">
    <select name="grade-quantifier-select" id="grade-quantifier-select"></select><select name="grade-category-select" id="grade-category-select"></select>
</div>
<div id="nutrition-grade"></div>

Well, it seems that the United States have better grades for product containing a lot of additives, compared to the world distribution. Why so? One possible explanation being the lack of transparency, in fact corporations there are not obliged to write all the ingredients thus affecting our scoring system.

<div id="top-country-additives"></div>

Still, if we have a broader look at the data we can clearly see that North America in general tends to sell products with a lot of additives, as opposed to Europe.

<div id="additives-per-product"></div>

Moreover the number of additives per product follows very accurately an exponential distribution. There even exists a product which contains 38 known additives. **Yuck!**

Before going further, let's clarify the term "additive". A food additive is an added substance to preserve flavor, enhance its taste, appearance, or other qualities. Not all additives are synthetic, in fact some of them have been naturally used for centuries such as salt or vinegar. However not all additives are completely safe for us, as for `E250`.

<div id="top-additives"></div>

The above depicts the distribution of additives among products around the world. Most of them are emulsifiers, food colouring and preservatives.

What about dangerous ingredients such as palm oil?

<div id="top-country-palm-oil"></div>

While the United States and Australia are represented as not using much palm oil, it turns out they simply have a different _name_ for it: "vegetable oil"!

# Impact of social status on nutritive health
## How healthy does each class eat?

Previously, we have seen that there is a relationship between some social status indicators and the choice of food types. Also, we have shown that the budget allocated to food consumption depends on the social status of the household. In this part, we  summarize this by studying the influence of social status on the general nutrition grade of products consumed.


### Social class VS Nutrition grade


<table class="mini">
<thead>
<tr><th>-15K</th><th>015-024K</th><th>025-034K</th><th>035-049K</th><th>050-074K</th><th>075-099K</th><th>100-124K</th><th>125-149K</th><th>150-174K</th><th>175-199K</th><th>200-249K</th><th>250K+</th></tr>
</thead>
<tbody>
<tr><td>D</td><td>D</td><td>D</td><td>C</td><td>C</td><td>C</td><td>B</td><td>C</td><td>A</td><td>A</td><td>A</td><td>D</td></tr>
</tbody>
</table>

First let us start with the impact of the income on the nutrition grade. Surprisingly, the results are in accordance with our hypothesis. Households with an income between 15K and 50K dollars tend to buy food products with low nutrition grade. As the income grows higher, the nutrition grade of consumed foods improves. For incomes between 175K and 250K dollars, we can see that the most frequent nutrition grade of consumed food products is very high. This shows that income has a direct relationship with how healthy a household eats. Wealthy households seem to eat a lot healthier than others with lower income. However, we can observe that for the super rich ones, the nutrition grade drops dramatically. May be Caviar isn’t that healthy after all.
	
<table class="mini">
<thead>
<tr><th>19-24</th><th>25-34</th><th>35-44</th><th>45-54</th><th>55-64</th><th>65+</th></tr>
</thead>
<tbody>
<tr><td>D</td><td>D</td><td>D</td><td>C</td><td>D</td><td>C</td></tr>
</tbody>
</table>
	
What about the influence of the age ? The impact is not as visible as for the income. There is a tendency for young households to eat less healthier food than older ones, but the grade goes up by one level only.

### Social class VS Food composition	
Let us now examine these observations in details. Considering the nutrition grade only is not completely representative of these influences. We complete it by looking at the food composition.

<div id="income-radar"></div>

Low income households seem to consume more fat and proteins than others, they also seem to pick in general high energetic products. Wealthy households, in contrast, has a much more balanced diet with more or less equal moderate quantities of fat, carbohydrates and proteins, and choose products with lower energy value. 

<div id="age-radar"></div>

If we do the same for the age category, we see that young households tend to consume more fats and sugars (carbohydrates) as well as high energetic products. Middle aged households seem to have a well balanced nutrition, with low fats and low sugar. Also the food products they choose have low energetic value. Seniors, on their side, consume very low sugar, but have a diet with a lot proteins and fat, and the products they buy are very energetic.

## Correlation between Social status and nutrition grade

As we expected, we could observe that there is a direct link between social status and the healthiness of consumed food. But, we would like to know if these observations can be statistically confirmed. We take a look at the correlations between income, age and nutrition grade.

We see that there are some slight correlations between high income and high nutrition grades, middle incomes seem to be slightly correlated as well with middle nutrition grades, while low incomes are correlated with low nutrition grades.

For the age, the correlation with nutrition grade seems to be linear, meaning that young age categories are slightly correlated with low nutrition grades, and the older the households are, the higher is the correlation with a better nutrition grade.

<div id="correlation-grades"></div>

# Conclusion

What a journey our DLAB scientist has lived! <br>

Food consumption is at the heart of many debates : the human race has always centered its attention toward this basic need which defines us.<br>
During this study, we finally established a connection between social status and food consumption. There is now a clear common trend between wealthiness and healthiness.<br>
But this trend truly highlights the fact that cultures from around the world and especially the United States will share common food consumption trends in regards to this perpetual need of health, which means : less additives, less palm oil... less excess to sum it up!<br>

For further work, it would be great to have access to a database similar to `dunnhumby` but applied to more retailers from around the world. Naturally, we also want more data in the `Open-Food-Facts` Database in order to apply some of our previous analysis techniques on many more countries previously ignored because of a lack of data.<br>
Most importantly, some fresh ideas could be applied in this study, by finding a more **"social"** database that could identify patterns between any social network (friends, family, political orientation, religion etc...) and our daily food consumption in order to have a more comprehensive and broad point of view!

In fact, being a DLAB scientist for a day was truly an amazing journey, and left us with some "food for taughts" ;)!   
 



