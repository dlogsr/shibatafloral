<link style="text/css" rel="stylesheet" href="contentstyle.css" />
<div class="data">
 	<form action="products_iframe.php" method="post">
    	<select name="catSelect">
        	<option value="1">Flowers</option>
            <option value="2">Accessories</option>
            <option value="3">Etc.</option>
        </select>
        <input type="submit" value="Submit">
     </form>
     
	<?php
        mysql_connect("localhost","sfclax_mysql","shibata") or die(mysql_error());
        mysql_select_db("sfclax_products") or die(mysql_error());
        
        $sql = "SELECT * FROM products WHERE cat_id = '$_POST[catSelect]'";
        $result = mysql_query($sql)or die(mysql_error());
        
			echo "<table>";
			echo "<tr><th>ID#</th><th>Category</th><th>Name</th><th>Price</th></tr>";
			
			while($row = mysql_fetch_array($result)){
				$prd_id = $row['prd_id'];
				$cat_id = $row['cat_id'];
				$name    = $row['prd_name'];
				$price     = $row['prd_price'];

				echo "<tr><td syle='width: 100px'>".$prd_id."</td><td style='width: 100px;'>".$cat_id."</td><td style='width: 300px;'>".$name."</td><td style='width:75px'>".$price."</td></tr>";
			}
			echo "</table>";
    ?>
</div>