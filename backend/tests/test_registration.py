import pytest
from unittest.mock import AsyncMock, patch, MagicMock

from handlers.registration import handle_registration, WELCOME_TEXT


@pytest.mark.asyncio
@patch("handlers.registration.send_message", new_callable=AsyncMock)
@patch("handlers.registration.supabase")
async def test_handle_registration_new_user(mock_supabase, mock_send_message):
    """Test that a new user gets added to the database with state 'registering'."""
    # Mock supabase response for user check (user not found)
    mock_select = MagicMock()
    mock_select.eq.return_value.limit.return_value.execute.return_value.data = []
    
    mock_insert = MagicMock()
    mock_table = MagicMock()
    mock_table.select.return_value = mock_select
    mock_table.insert.return_value = mock_insert
    
    # Configure the chained calls on supabase
    def side_effect(table_name):
        if table_name == "users":
            return mock_table

    mock_supabase.table.side_effect = side_effect

    await handle_registration("1234567890", "Hello")

    # Verify insert was called correctly
    mock_insert.execute.assert_called_once()
    mock_table.insert.assert_called_with({
        "whatsapp_number": "1234567890",
        "state": "registering",
        "state_data": {},
    })

    # Verify welcome message was sent
    mock_send_message.assert_called_once_with("1234567890", WELCOME_TEXT)


@pytest.mark.asyncio
@patch("handlers.registration.send_message", new_callable=AsyncMock)
@patch("handlers.registration.supabase")
async def test_handle_registration_collect_name_success(mock_supabase, mock_send_message):
    """Test that a user in 'registering' state successfully provides a name."""
    # Mock user exists in registering state
    mock_select = MagicMock()
    mock_select.eq.return_value.limit.return_value.execute.return_value.data = [
        {"whatsapp_number": "1234567890", "state": "registering", "name": None}
    ]
    
    mock_update = MagicMock()
    mock_table = MagicMock()
    mock_table.select.return_value = mock_select
    mock_table.update.return_value = mock_update
    
    def side_effect(table_name):
        if table_name == "users":
            return mock_table

    mock_supabase.table.side_effect = side_effect

    await handle_registration("1234567890", "John Doe")

    # Verify update was called to change state to idle and set name
    mock_update.eq.return_value.execute.assert_called_once()
    mock_table.update.assert_called_with({"name": "John Doe", "state": "idle"})
    
    # Verify success message
    mock_send_message.assert_called_once()
    args, _ = mock_send_message.call_args
    assert "Thank you, John Doe" in args[1]


@pytest.mark.asyncio
@patch("handlers.registration.send_message", new_callable=AsyncMock)
@patch("handlers.registration.supabase")
async def test_handle_registration_collect_name_invalid(mock_supabase, mock_send_message):
    """Test that providing an invalid name (too short) reprompts the user."""
    # Mock user exists in registering state
    mock_select = MagicMock()
    mock_select.eq.return_value.limit.return_value.execute.return_value.data = [
        {"whatsapp_number": "1234567890", "state": "registering", "name": None}
    ]
    
    mock_table = MagicMock()
    mock_table.select.return_value = mock_select
    
    def side_effect(table_name):
        if table_name == "users":
            return mock_table

    mock_supabase.table.side_effect = side_effect

    await handle_registration("1234567890", "A")

    # Verify update was NOT called
    mock_table.update.assert_not_called()
    
    # Verify reprompt message
    mock_send_message.assert_called_once()
    args, _ = mock_send_message.call_args
    assert "Please send your full name" in args[1]
