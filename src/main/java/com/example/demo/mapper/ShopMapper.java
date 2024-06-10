package com.example.demo.mapper;

import com.example.demo.unPyeongGuShop.domain.ShopVO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface ShopMapper {

    List<ShopVO> findShopList();

}
