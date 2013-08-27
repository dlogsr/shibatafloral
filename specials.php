<link style="text/css" rel="stylesheet" href="des1style.css" />
<link style="text/css" rel="stylesheet" href="contentstyle.css" />
<div id="maincontent" class="main">
    <div id="side" class="data"><h2 id="dateTitle">Specials</h2></div>
    <div id="content" class="data">
        <section>
        <?php
            mysql_connect("localhost","sfclax_mysql","shibata") or die(mysql_error());
            mysql_select_db("sfclax_specials") or die(mysql_error());
            
            $sql = "SELECT * FROM specials";
            $result = mysql_query($sql)or die(mysql_error());
            
            echo "<table id='prodTable'>";
            echo "<tr><th>Item</th><th></th><th>Name</th><th>Reg. Price</th><th>Sale Price</th></tr>";
            
            while($row = mysql_fetch_array($result)){
                $prd_id = $row['spc_id'];
                $name    = $row['spc_name'];
                $price     = $row['spc_price'];
                $origprice = $row['spc_origprice'];
                $image = $row['spc_imageurl'];

                if($price=="END")
                {
                    $date = $row['spc_name'];
                    echo "<script>document.getElementById('dateTitle').innerHTML='Specials for Week of ".$date."';</script>";
                }
                else
                {
                    echo "<tr><td syle='width: 100px'>".$prd_id."</td><td style='width:75px'><a href='products/".$image."' target='_blank'><img src='products/thumbs/th_".$image."' /></a></td>";
                    echo "<td style='width: 300px;'>".$name."</td><td style='width:100px'>".$origprice."</td><td style='width:100px'>".$price."</td></tr>"; 
                }
                
            }
            
            //next step is to make this into a grid system, load these values into a smaller enclosed
            //table format and then every 4-5 or so, line break to the next row?
            echo "</table>";
        ?>
        </section>
        </p>
        <section id="footer">
            © SHIBATA FLORAL COMPANY 2013  All Rights Reserved
        </section>
    </div>
</div>
