<!--<link style="text/css" rel="stylesheet" href="des1style.css" />-->
<link style="text/css" rel="stylesheet" href="contentstyle.css" />

<div id="maincontent" class="main">
	<?php 
		$submitted=false;
		if($_POST[prodCat] != NULL)
		{
			$submitted=true;
			echo "<p>Data Submitted. Adding to MySQL Database.</p>";
		}
		else
		{
			echo "<p>No data to add.</p>";
		}
	?>
		
    <div id="side" class="data"><h2>Products</h2></div>    
    <!--PHP to submit the item to MySQL database -->
    <?php
		if($submitted)
		{
			mysql_connect("localhost","sfclax_mysql","shibata") or die(mysql_error());
			mysql_select_db("sfclax_products") or die(mysql_error());

			//make sure we know what to save the file name as in the DB
			$filename = $_FILES['uploadedfile']['name'];
				$tempfilename = $_FILES['uploadedfile']['tmp_name'];
			
			$sql= "INSERT INTO products(prd_name,prd_price,cat_id,image) 
						VALUES('$_POST[prodName]','$_POST[prodPrice]','$_POST[prodCat]','$filename')";
			$result = mysql_query($sql)or die(mysql_error());
			//this ends the MySQL data storage.
			
			//now to store the uploaded image
			$img = imagecreatefromjpeg($tempfilename);
			$target_path = "products/";
			$target_path = $target_path . basename($filename);
			
			if(move_uploaded_file($tempfilename, $target_path)) {
				echo "The file ". basename($filename). " has been uploaded";
			} else{
				echo "Error uploading image file.";
			}
			
			//create thumbnail of that image
			$maxsize = 150;
			
			if(imagesx($img) >= imagesy($img)) {
				$thumb_x = $maxsize;
				$thumb_y = imagesy($img)*($maxsize/imagesx($img));
			} else {
				$thumb_y = $maxsize;
				$thumb_x = imagesx($img)*($maxsize/imagesy($img));
			}
			
			$thumb = imagecreatetruecolor($thumb_x,$thumb_y);	
			imagecopyresampled($thumb, $img, 0, 0, 0, 0, $thumb_x, $thumb_y, imagesx($img), imagesy($img));
			imagejpeg($thumb, 'products/thumbs/th_'. basename($filename));
			
			echo "<p>Done.</p>";
		}
	?>
	
    
    <div id="content" class="data">
        <div id="stage" class="data">
    	Item to submit:<br />
        Category: <?php echo $_POST["prodCat"]; ?><br />
        Name: <?php echo $_POST["prodName"]; ?><br />
        Price: <?php echo $_POST["prodPrice"]; ?><br />
        Image: <?php echo $_FILES['uploadedfile']['name']; ?>
        <p></p>
	    </div>
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
			echo "</table>";
		?>
    </div>
    <p></p>
    <div id="addProductsForm">
    	<form name="addProduct" action="products_add.php" method="post" enctype="multipart/form-data">
        	<p>Category: 
            	<select name="prodCat">
                	<option value="1">Flowers (1)</option>
                    <option value="2">Accessories (2)</option>
                    <option value="3">Etc (3)</option>
                </select>
            </p>
            <p>Name: <input type="text" name="prodName" /></p>
            <p>Price: <input type="number" name="prodPrice" step="any"/></p>
            <p>Image File: <input name="uploadedfile" type="file" /></p>
            <p><input type="submit" value="Submit" /></p>
        </form>
    </div>
        
</div>
