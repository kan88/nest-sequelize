<?php

try {
  require '/Web/linux/connect/connect.php';

  $UFNSCA = array("IFNS9962", "IFNS9965", "IFNS9966", "IFNS9967", "IFNS9968", "IFNS9970", "IFNS9971", "IFNS9972", "IFNS9973", "IFNS9974");


  for ($k = 0; $k < count($UFNSCA); $k++) {
    echo "<h3>LDAP query test</h3>";
    echo "Connecting ...";
    $ds = ldap_connect("ldap://n5001-dc07.regions.tax.nalog.ru");
    $user = 'n7700_svc_ldap';
    $pass = '1Gfhjkmgfhjkm';
    ldap_set_option($ds, LDAP_OPT_PROTOCOL_VERSION, 3);
    ldap_set_option($ds, LDAP_OPT_REFERRALS, 0);
    ldap_set_option($ds, LDAP_OPT_SIZELIMIT, 150000);
    echo "connect result is " . $ds . "<br />";


    if ($ds) {
      echo "Binding ...";
      $r = ldap_bind($ds, $user, $pass);
      echo "Bind result is " . $r . "<br />";
      $dn = "OU={$UFNSCA[$k]},OU=MIFNS,DC=regions,DC=tax,DC=nalog,DC=ru";
      $filter = "(&(!(department=Nul))(sAMAccountName=*)(!(cn=Nul))(!(givenName=Nul))(!(sn=Nul))(objectCategory=person)(!(manager=Nul))(!(company=Nul))(!(userAccountControl:1.2.840.113556.1.4.803:=2)))";
      $attributes = array("cn", "givenname", "sn", "title", "telephonenumber", "whenchanged", "department", "company", "samaccountname", "mail", "manager", "jpegphoto", "directreports");
      $cookie = '';
      require __DIR__ . '/common.php';
      echo "Closing connection";
      ldap_close($ds);
    } else {
      echo "<h4>Unable to connect to LDAP server</h4>";
    }
  }
} catch (PDOException $e) {
  echo "Database error: " . $e->getMessage();
}