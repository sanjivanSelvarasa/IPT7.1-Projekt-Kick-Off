#!/bin/bash

# Quick database management hack

BACKEND_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)/Backend"
USER_DB="$BACKEND_DIR/database/user.db"
USERDATA_DB="$BACKEND_DIR/database/userdata.db"

if ! command -v sqlite3 &> /dev/null; then
    echo "Error: sqlite3 required"
    exit 1
fi

show_menu() {
    echo ""
    echo "1. View all users"
    echo "2. View user details"
    echo "3. Delete user"
    echo "4. Exit"
    echo ""
}

view_all_users() {
    echo ""
    sqlite3 "$USER_DB" ".mode column" ".headers on" \
        "SELECT id, email, username, created_at FROM users;"
    echo ""
}

view_user_details() {
    read -p "User ID: " user_id
    echo ""
    
    sqlite3 "$USER_DB" "SELECT 'ID: ' || id, 'Email: ' || email, 'Username: ' || username, 'Created: ' || created_at FROM users WHERE id = $user_id;"
    
    echo ""
    sqlite3 "$USERDATA_DB" "SELECT 'Bio: ' || coalesce(bio, '(empty)'), 'Avatar: ' || coalesce(avatar_url, '(empty)'), 'Twitter: ' || coalesce(twitter, '(empty)'), 'LinkedIn: ' || coalesce(linkedin, '(empty)'), 'GitHub: ' || coalesce(github, '(empty)'), 'Instagram: ' || coalesce(instagram, '(empty)') FROM user_profiles WHERE user_id = $user_id;"
    echo ""
}

delete_user() {
    read -p "User ID to delete: " user_id
    
    email=$(sqlite3 "$USER_DB" "SELECT email FROM users WHERE id = $user_id;")
    
    if [ -z "$email" ]; then
        echo "User not found"
        return
    fi
    
    read -p "Delete $email? (yes/no): " confirm
    
    if [ "$confirm" != "yes" ]; then
        echo "Cancelled"
        return
    fi
    
    sqlite3 "$USERDATA_DB" "DELETE FROM user_profiles WHERE user_id = $user_id;"
    sqlite3 "$USER_DB" "DELETE FROM users WHERE id = $user_id;"
    echo "Deleted user $email"
    echo ""
}

while true; do
    show_menu
    read -p "Option (1-4): " choice
    
    case $choice in
        1) view_all_users ;;
        2) view_user_details ;;
        3) delete_user ;;
        4) echo "Done"; exit 0 ;;
        *) echo "Invalid option" ;;
    esac
done
