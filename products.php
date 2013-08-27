<link style="text/css" rel="stylesheet" href="des1style.css" />
<link style="text/css" rel="stylesheet" href="contentstyle.css" />

<div id="maincontent" class="main">

    <div id="side" class="data"><h2>Products</h2></div>
    <section id="content" class="data">
		<?php
			mysql_connect("localhost","sfclax_mysql","shibata") or die(mysql_error());
			mysql_select_db("sfclax_products") or die(mysql_error());
			
			$sql = "SELECT * FROM products";
			$result = mysql_query($sql)or die(mysql_error());
			
			echo "<table>";
			echo "<tr><th>ID#</th><th>Category</th><th>Name</th><th>Price</th><th>Image</th></tr>";
			
			while($row = mysql_fetch_array($result)){
				$prd_id = $row['prd_id'];
				$cat_id = $row['cat_id'];
				$name    = $row['prd_name'];
				$price     = $row['prd_price'];
				$image = $row['image'];

				echo "<tr><td syle='width: 100px'>".$prd_id."</td><td style='width: 100px;'>".$cat_id."</td><td style='width: 300px;'>".$name."</td><td style='width:75px'>".$price."</td><td style='width:75px'><a href='products/".$image."' target='_blank'><img src='products/thumbs/th_".$image."' /></a></td></tr>";
			}
			
			//next step is to make this into a grid system, load these values into a smaller enclosed
			//table format and then every 4-5 or so, line break to the next row?
			echo "</table>";
		?>
        <p></p>
       	<iframe src="products_iframe.php" seamless="seamless" width="600px" height="300px" frameborder="0"></iframe>
        <p></p>
        <a href="products_add.php" target="_blank">Click here for products add form (testing)</a>
    </section>
           
</div>
