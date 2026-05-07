package com.example.myapplication

import android.annotation.SuppressLint
import android.os.Bundle
import android.util.Log
import android.widget.Button
import android.widget.EditText
import androidx.activity.enableEdgeToEdge
import androidx.appcompat.app.AppCompatActivity
import androidx.core.view.ViewCompat
import androidx.core.view.WindowInsetsCompat

class MainActivity : AppCompatActivity() {
    lateinit var usernameInput : EditText
    lateinit var passwordInput : EditText
    lateinit var btnLogin : Button

    @SuppressLint("MissingInflatedId")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        this.enableEdgeToEdge()
        setContentView(R.layout.activity_main)
        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.main)) { v, insets ->
            val systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars())
            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom)
            insets
        }

        usernameInput = findViewById(R.id.usernameInput)
        passwordInput = findViewById(R.id.passwordInput)
        btnLogin = findViewById(R.id.login_btn)
        btnLogin.setOnClickListener {
            val username = usernameInput.text.toString()
            val password = passwordInput.text.toString()

            if (username.isNotEmpty() && password.isNotEmpty()) {
                usernameInput.error = null
                passwordInput.error = null
                Log.i("Test Credentials", "Username : $username & Password : $password")
            } else {
                if (username.isEmpty()) {
                    usernameInput.error = "Username is required"
                }
                if (password.isEmpty()) {
                    passwordInput.error = "Password is required"
                }
                Log.w("Test Credentials", "Username or Password cannot be empty")
            }
        }
    }
}