package com.example.demo.together.common.utils.jwt.repository;

import com.example.demo.together.common.utils.jwt.bean.RefreshToken;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Transactional//update, delete
@Repository
public interface RefreshTokenRepo extends CrudRepository<RefreshToken, String> {

}
