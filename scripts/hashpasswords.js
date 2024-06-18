const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcryptjs');

// Connect to the SQLite database
const db = new sqlite3.Database('./gaf_database.sqlite'); // Adjust the path if needed

// Function to hash passwords
const hashPassword = async (password) => {
	const salt = await bcrypt.genSalt(10);
	const hash = await bcrypt.hash(password, salt);
	return hash;
};

// Function to update passwords in the database
const updatePasswords = async () => {
	db.all('SELECT id, password FROM users', async (err, rows) => {
		if (err) {
			console.error('Error fetching users:', err.message);
			return;
		}

		for (const row of rows) {
			const hashedPassword = await hashPassword(row.password);
			db.run(
				'UPDATE users SET password = ? WHERE id = ?',
				[hashedPassword, row.id],
				(updateErr) => {
					if (updateErr) {
						console.error(
							`Error updating password for user ${row.id}:`,
							updateErr.message,
						);
					} else {
						console.log(`Password for user ${row.id} updated successfully.`);
					}
				},
			);
		}

		db.close((closeErr) => {
			if (closeErr) {
				console.error('Error closing the database:', closeErr.message);
			} else {
				console.log('Database connection closed.');
			}
		});
	});
};

// Start the update process
updatePasswords();
