from django.db import models

class Customer(models.Model):
    customer_id = models.AutoField(db_column='CustomerID', primary_key=True)
    username = models.CharField(db_column='UserName', max_length=100)
    address = models.CharField(db_column='Address', max_length=255, blank=True, null=True)
    email = models.CharField(db_column='Email', max_length=100, unique=True)
    password = models.CharField(db_column='Password', max_length=100)

    class Meta:
        managed = False  
        db_table = 'Customer'

    def __str__(self):
        return self.username
