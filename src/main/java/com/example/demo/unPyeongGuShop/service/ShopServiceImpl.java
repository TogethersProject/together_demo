package com.example.demo.unPyeongGuShop.service;

import com.example.demo.mapper.ShopMapper;
import com.example.demo.unPyeongGuShop.domain.ShopVO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ShopServiceImpl implements ShopService {

    private final ShopMapper shopMapper;



    @Override
    public List<ShopVO> findShopList() {
        return shopMapper.findShopList();
    }
}
