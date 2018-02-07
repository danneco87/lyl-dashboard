from __future__ import unicode_literals
from django.db import models
# Product model for creating migrations


class Product(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    price = models.DecimalField(decimal_places=2, max_digits=10)
