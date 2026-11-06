from campay.sdk import Client as CampayClient
from django.conf import settings
import logging

logger = logging.getLogger(__name__)


class CampayService:
    """Service class for Campay payment integration"""
    
    def __init__(self):
        self.client = CampayClient({
            "app_username": settings.CAMPAY_APP_USERNAME,
            "app_password": settings.CAMPAY_APP_PASSWORD,
            "environment": settings.CAMPAY_ENVIRONMENT,
        })
    
    def initiate_payment(self, amount, phone_number, description, external_reference):
        """
        Initiate a payment collection request
        
        Args:
            amount (float): Amount to collect in XAF
            phone_number (str): Customer phone number (e.g., "237671234567")
            description (str): Payment description
            external_reference (str): Your unique reference
        
        Returns:
            dict: Response from Campay with success status
        """
        try:
            # Normalize phone number to 237XXXXXXXXX format
            phone_number = self._normalize_phone_number(phone_number)
            
            logger.info(f"[CAMPAY] Initiating payment: {amount} XAF to {phone_number}")
            
            collect = self.client.collect({
                "amount": str(amount),
                "currency": "XAF",
                "from": phone_number,
                "description": description,
                "external_reference": external_reference,
            })
            
            logger.info(f"[CAMPAY] Payment initiated successfully: {collect}")
            
            return {
                'success': True,
                'reference': collect.get('reference'),
                'operator': collect.get('operator'),
                'status': collect.get('status'),
                'raw_response': collect
            }
            
        except Exception as e:
            logger.error(f"[CAMPAY] Payment initiation failed: {str(e)}")
            return {
                'success': False,
                'error': str(e)
            }
    
    def check_transaction_status(self, reference):
        """
        Check the status of a transaction
        
        Args:
            reference (str): Campay transaction reference
        
        Returns:
            dict: Transaction status information
        """
        try:
            logger.info(f"[CAMPAY] Checking status for reference: {reference}")
            
            status = self.client.get_transaction_status(reference)
            
            logger.info(f"[CAMPAY] Transaction status: {status}")
            
            return {
                'success': True,
                'status': status.get('status'),
                'raw_response': status
            }
            
        except Exception as e:
            logger.error(f"[CAMPAY] Failed to check transaction status: {str(e)}")
            return {
                'success': False,
                'error': str(e)
            }
    
    def get_balance(self):
        """
        Get current account balance
        
        Returns:
            dict: Account balance information
        """
        try:
            logger.info("[CAMPAY] Fetching account balance")
            
            balance = self.client.get_balance()
            
            logger.info(f"[CAMPAY] Current balance: {balance}")
            
            return {
                'success': True,
                'balance': balance
            }
            
        except Exception as e:
            logger.error(f"[CAMPAY] Failed to get balance: {str(e)}")
            return {
                'success': False,
                'error': str(e)
            }
    
    def _normalize_phone_number(self, phone_number):
        """
        Normalize phone number to Campay format (237XXXXXXXXX)
        
        Args:
            phone_number (str): Phone number in various formats
        
        Returns:
            str: Normalized phone number
        """
        # Remove all spaces and dashes
        phone_number = phone_number.replace(' ', '').replace('-', '')
        
        # Handle different formats
        if phone_number.startswith('00237'):
            phone_number = phone_number[2:]  # Remove 00
        elif phone_number.startswith('+237'):
            phone_number = phone_number[1:]  # Remove +
        elif phone_number.startswith('0'):
            phone_number = '237' + phone_number[1:]  # Replace 0 with 237
        elif not phone_number.startswith('237'):
            phone_number = '237' + phone_number  # Add 237 prefix
        
        logger.info(f"[CAMPAY] Normalized phone number: {phone_number}")
        
        return phone_number