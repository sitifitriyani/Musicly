package org.fitri.musicly.controllers;

import java.util.List;

import org.fitri.musicly.models.User;
import org.fitri.musicly.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;



@CrossOrigin(origins ="http://localhost:5173",allowCredentials = "true",allowPrivateNetwork = "true")
@RequestMapping("/users")
@RestController
public class UserController {
     @Autowired
    UserRepository repository;

     @GetMapping
    public List<User> getAll() {
    return repository.findAll();
    }


     @GetMapping("/{id}")
    public Object getById(@PathVariable Long id) {
        User user = repository.findById(id).orElse(null);
        if (user!= null) {
            return user;
        } else {
            return " user with ID " + id + " not found";
        }
    }

    // @PostMapping
    // public String create(@RequestBody User user) {
    //     repository.save(user);
    //     return "sewa successfully added";
    // }

 @DeleteMapping("/{id}")
    public String deleteById(@PathVariable Long id) {
        repository.deleteById(id);
        return "users successfully deleted";
    }

//     @GetMapping("/me")
// public User getCurrentUser(HttpServletRequest request) {
//     // Ambil ID dari token atau session yang tersimpan di request
//     Long userId = ...userId; // Ambil ID pengguna dari token atau session
//     User user = repository.findById(userId).orElse(null);
//     if (user != null) {
//         return user;
//     } else {
//         throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found");
//     }
// }
    
}