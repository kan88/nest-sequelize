<?php

try {
  require '../../connect.php';
  $statement = $pdo->prepare("SELECT * FROM weekend");
  $statement->execute();
  $results = $statement->fetchAll(PDO::FETCH_ASSOC);
  $json = json_encode($results);
  echo ($json);
} catch (PDOException $e) {
  echo "Database error: " . $e->getMessage();
}
